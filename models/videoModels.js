"use strict";
const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let videoSchema = new Schema({
  title: String,
  videoSrc: String,
  notes: [{
      time: Number,
      displayTime: String,
      note: String
  }]
});

let Video = mongoose.model("video", videoSchema);

module.exports = Video;