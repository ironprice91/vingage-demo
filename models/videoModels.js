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

/*
use robomongo
EXAMPLE
{
  title: 'BackboneJS',
  videoSrc: 'https://s3.amazonaws.com/refactoru/public/Backbonejs+Tutorial+-+Beginners.mp4',
  notes: [{
  	time: 6,
  	displayTime: "0:06",
  	note: 'This is a note I want on the page'
	}]
}
*/

let Video = mongoose.model("video", videoSchema);

module.exports = Video;