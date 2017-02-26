"use strict";
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const apiController = require("./api/apiController");

let port = process.env.PORT || 6060;
let env = process.env.NODE_ENV || "dev";

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/vingage");

// react index.html
const indexPath = path.join(__dirname, "/index.html");

app.use("/public/", express.static(path.join(__dirname, "./public")));

app.use(function(req, res, next) {
  if ( env !== "dev" ) {
    next();
    return;
  }
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
      res.sendFile(indexPath);
});

apiController(app);

app.listen(port, () => {
    console.log(`listening on port ${port}: http://localhost:${port}`);
});