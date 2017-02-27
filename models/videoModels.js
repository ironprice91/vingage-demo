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
EXAMPLE document
{
    "_id" : ObjectId("58b4411c3c7f435dfedbe031"),
    "title" : "BackboneJS",
    "videoSrc" : "https://s3.amazonaws.com/refactoru/public/Backbonejs+Tutorial+-+Beginners.mp4",
    "notes" : [
        {
            "_id" : ObjectId("58b4439bbb271f459d588618"),
            "time" : 0,
            "displayTime" : "0:00",
            "note" : "this is a new note"
        }
    ]
}
*/

let Video = mongoose.model("video", videoSchema);

module.exports = Video;