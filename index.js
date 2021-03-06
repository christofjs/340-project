const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

const ENV = process.env.NODE_ENV;
/**
 * Load env variables
 * 
 * Based on docs 
 * https://www.npmjs.com/package/dotenv
 */
require("dotenv").config({
  path: path.resolve(
    process.cwd(),
    ENV === "development" ? ".env.development" : ".env"
  ),
});

const PORT = process.env.NODE_ENV === "development" ? 4000 : process.argv[2];
const app = express();

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: {
      formatDateForCalendarInput: (rawDate) => {
        const parsedDate = new Date(rawDate)
        const year = parsedDate.getFullYear();
        const month = parsedDate.getMonth();
        const day = parsedDate.getDay();

        const paddedMonth = month < 10 ? `0${month + 1}` : month + 1
        const paddedDay = day < 10 ? `0${day}` : day

        return `${year}-${paddedMonth}-${paddedDay}`
      },
      formatDateforTable: (rawDate) => {
        return new Date(rawDate).toDateString()
      },
      formatCreatedAtDate: (rawDate) => {
        return new Date(rawDate).toISOString()
      }
    }
  })
);

app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

require("./routes/properties.route")(app);
require("./routes/bookings.route")(app);
require("./routes/customers.route")(app);
require("./routes/invoices.route")(app);

app.listen(PORT, () => {
  `Server is listening on port ${PORT}`;
});
