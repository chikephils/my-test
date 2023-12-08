const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const ErrorHandler = require("./middleware/Error");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

//import Routes
const user = require("./controller/user");
const sector = require("./controller/sectors");

app.use("/api/v2/user", user);
app.use("/api/v2/sectors", sector);

app.use(ErrorHandler);

app.use("/", (req, res) => {
  res.send("Hello world!");
});

module.exports = app;
