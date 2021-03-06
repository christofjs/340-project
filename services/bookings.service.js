class BookingsService {
  constructor({ bookingModel }) {
    this.bookingModel = bookingModel;
  }
  async findAll() {
    return await this.bookingModel.findAll();
  }

  async findOne({ id, withCustomers = false }) {
    return await this.bookingModel.findOne({ id, withCustomers });
  }

  async findBookingProperty(id) {
    return await this.bookingModel.findBookingProperty(id)
  }

  async create({ booking, customers }) {
    const newBooking = await this.bookingModel.create(booking);
    await this.bookingModel.addCustomers({
      customers,
      booking_id: newBooking.insertId,
    });

    return newBooking
  }

  async addCustomers({ customer_ids, booking_id }) {
    return await this.bookingModel.addCustomers({
      customers: { customer_ids },
      booking_id: booking_id,
    });
  }

  async removeCustomer({ booking_id, customer_id }) {
    return await this.bookingModel.removeCustomer({ booking_id, customer_id });
  }

  async update({id, updates}){
    return await this.bookingModel.update({id, updates})
  }
}

module.exports = { BookingsService };
