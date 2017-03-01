"use strict";
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const apiController = require("./api/apiController");
const cors = require("cors");

let port = process.env.PORT || 6060;
let env = process.env.NODE_ENV || "dev";

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/vingage");

// react index.html
const indexPath = path.join(__dirname, "/index.html");

app.set("trust proxy", true);
app.use("/public/", express.static(path.join(__dirname, "./public")));

// enable CORS for dev since API is on different port
if ( env === "dev" ) { app.use(cors()); }

app.get("/", (req, res) => {
      res.sendFile(indexPath);
});

apiController(app);

app.listen(port, () => {
    console.log(`listening on port ${port}: http://localhost:${port}`);
});