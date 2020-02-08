const express = require("express");
const bodyParser = require("body-parser");

const campsiteRouter2 = express.Router();

campsiteRouter2.use(bodyParser.json());

campsiteRouter2
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the campsites to you2");
  });

module.exports = campsiteRouter2;
