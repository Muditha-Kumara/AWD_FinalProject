const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin); // Dynamically set the origin to the incoming request's origin
  },
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api", require("./routes"));

// Error handling middleware (add after routes)
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

module.exports = app;
