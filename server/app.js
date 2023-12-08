const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const ErrorHandler = require("./middleware/Error");

app.use(
  cors({
    origin: ["https://my-test-client.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

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

module.exports = app;
