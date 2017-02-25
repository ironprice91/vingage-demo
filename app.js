"use strict";
const express = require("express");
const app = express();
const path = require("path");

let port = process.env.PORT || 6060;

// react index.html
const indexPath = path.join(__dirname, "/index.html");

app.use("/", express.static(path.join(__dirname, "./public")))

app.get("/", (req, res) => {
      res.sendFile(indexPath);
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});