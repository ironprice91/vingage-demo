"use strict";
const VideoData = require("../models/videoModels");
const bodyParser = require("body-parser");

module.exports = function(app) {
  let baseURL = "/api/";
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // get video
  app.get(`${baseURL}all`, (req, res) => {
    VideoData.find({}, (err, data) => {
        if ( err ) { throw err; }
        res.send(data);
    });
  });


};

