"use strict";
const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let videoSchema = new Schema({
  title: String,
  videoSrc: String,
  thumbnail: {type: String, default: "http://www.fillmurray.com/320/180"},
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

YOUTUBE EXAMPLE
{
    "_id" : ObjectId("58b5918a3c7f435dfedbe032"),
    "title" : "4 Reasons the NBA's \"One & Done\" rule needs to go",
    "videoSrc" : "https://www.youtube.com/watch?v=7UsqUZcXYHM",
    "thumbnail" : "https://img.youtube.com/vi/7UsqUZcXYHM/mqdefault.jpg",
    "notes" : []
}
*/

let Video = mongoose.model("video", videoSchema);

module.exports = Video;