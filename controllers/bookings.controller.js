const { BookingsService } = require("../services/bookings.service");
const { InvoicesService } = require("../services/invoices.service");
const { PropertiesService } = require("../services/properties.services");
const autoBind = require("auto-bind");

const { Booking } = require("../models/booking.model");
const { Invoice } = require("../models/invoice.model");
const { Property } = require("../models/property.model");
const { cleanPick } = require("../utilities/cleanPick");
const { update } = require("lodash");

class BookingsController {
  constructor() {
    this.bookingService = new BookingsService({ bookingModel: Booking });
    this.invoicesService = new InvoicesService({ invoiceModel: Invoice });
    this.propertiesService = new PropertiesService({ propertyModel: Property });
    autoBind(this);
  }

  async index(req, res) {
    const bookings = await this.bookingService.findAll();
    res.render("bookings", { bookings });
  }

  async show(req, res) {
    const { id } = req.params;
    const [[booking], customers] = await this.bookingService.findOne({
      id,
      withCustomers: true,
    });

    res.render("booking", {
      booking,
      customers,
    });
  }

  _new(req, res) {
    res.render("addBooking", {
      properties: [
        { id: 1, name: "Test Property 1" },
        { id: 2, name: "Test Property 2" },
      ],
    });
  }

  async create(req, res) {
    const booking = cleanPick(req.body, [
      "start_date",
      "end_date",
      "property_id",
    ]);
    booking.created_at = new Date();

    const customers = cleanPick(req.body, ["customer_ids"]);

    const createdBooking = await this.bookingService.create({
      booking,
      customers,
    });

    const [property] = await this.propertiesService.findOne(
      booking.property_id
    );

    await this.invoicesService.create({
      start_date: booking.start_date,
      end_date: booking.end_date,
      booking_id: createdBooking.insertId,
      rate: property.rate,
    });

    res.redirect("/bookings");
  }

  async removeCustomer(req, res) {
    const { booking_id, customer_id } = req.body;

    await this.bookingService.removeCustomer({ booking_id, customer_id });

    res.status(201).send({ message: "Customer removed from booking" });
  }

  async addCustomers(req, res) {
    const { customer_ids, booking_id } = req.body;

    await this.bookingService.addCustomers({ customer_ids, booking_id });

    res.status(201).send({ message: "Customer added to booking" });
  }

  async edit(req, res) {
    const { id } = req.params;

    const [[booking], customers] = await this.bookingService.findOne({
      id,
      withCustomers: true,
    });
    const [property] = await this.bookingService.findBookingProperty(id);

    res.render("editBooking", { booking, customers, property });
  }

  async update(req, res) {
    const bookingUpdates = cleanPick(req.body, [
      "id",
      "property_id",
      "start_date",
      "end_date",
    ]);

    await this.bookingService.update({
      id: bookingUpdates.id,
      updates: bookingUpdates,
    });

    const [property] = await this.propertiesService.findOne(
      bookingUpdates.property_id
    );

    if (bookingUpdates.start_date && bookingUpdates.end_date) {
      await this.invoicesService.update({
        start_date: bookingUpdates.start_date,
        end_date: bookingUpdates.end_date,
        booking_id: bookingUpdates.id,
        rate: property.rate,
      });
    }

    res.redirect(`/bookings/${bookingUpdates.id}`);
  }
}

module.exports = { BookingsController };
