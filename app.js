"use strict";
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const apiController = require("./api/apiController");

let port = process.env.PORT || 6060;

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/vingage");

// react index.html
const indexPath = path.join(__dirname, "/index.html");

app.use("/", express.static(path.join(__dirname, "./public")))

app.get("/", (req, res) => {
      res.sendFile(indexPath);
});

apiController(app);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});