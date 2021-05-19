const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

const PORT = process.env.NODE_ENV === "development" ? 4000 : process.argv[2];
const app = express();

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

require("./routes/properties.route")(app);
require("./routes/bookings.route")(app)

/////////////
// Customers
/////////////

app.get("/customers", (req, res) => {
  res.render("customers");
});

app.get("/customers/new", (req, res) => {
  res.render("addCustomer");
});

app.get("/customers/edit/:id", (req, res) => {
  res.render("editCustomer", {
    // test data
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@jd.com",
  });
});

app.post("/customers", (req, res) => {
  res.status(200).send(req.body);
});

app.get("/customers/:id", (req, res) => {
  res.render("customer", {
    first_name: "John",
    last_name: "Doe",
  });
});

/////////////
// Invoices
/////////////

app.get("/invoices", (req, res) => {
  res.render("invoices");
});

app.get("/invoices/edit/:id", (req, res) => {
  res.render("editInvoice", {
    // test data
    invoiceId: 1234,
    totalDue: 3000,
    amountPaid: 1500,
  });
});

app.post("/invoices", (req, res) => {
  res.status(200).send(req.body);
});

app.get("/invoices/:id", (req, res) => {
  res.render("invoice", {
    invoiceId: 1234,
  });
});

app.listen(PORT, () => {
  `Server is listening on port ${PORT}`;
});
