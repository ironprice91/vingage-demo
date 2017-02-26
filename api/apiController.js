"use strict";
const VideoData = require("../models/videoModels");
const bodyParser = require("body-parser");

module.exports = function(app) {
  let baseURL = "/api/video/";
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // get all videos
  app.get(`${baseURL}all`, (req, res) => {
    VideoData.find({}, (err, data) => {
        if ( err ) { throw err; }
        res.send(data);
    });
  });

  // get single video
  app.get(`${baseURL}:id`, (req, res) => {
      VideoData.find({_id: req.params.id}, (err, data) => {
          if ( err ) { throw err; }
          res.send(data);
      });
  });

  // add note
  app.post(`${baseURL}note`, (req, res) => {
      let videoID = req.body.id,
          data = req.body,
          id = videoID;

      let newNote = {};
      newNote.time = data.time;
      newNote.displayTime = data.displayTime;
      newNote.note = data.note;

      VideoData.findOneAndUpdate({_id:id}, {$push: {notes: newNote}}, {safe: true, upsert: true}, (err, data) => {
          if ( err ) { throw err; }
          res.send(`Added Note to Video: ${videoID}`);
      })
  });

  // update note
  app.post(`${baseURL}:videoID/note/:id`, (req, res) => {
      let videoID = req.params.videoID,
          noteID = req.params.id,
          newNote = req.body.note;

      VideoData.update({_id: videoID, "notes._id": noteID}, {$set: {"notes.$.note": newNote}}, (err, data) => {
          if ( err ) { throw err; }
          res.send(`Update note: ${noteID} for video ${videoID}`);
      });
  });

  // delete note
  app.delete(`${baseURL}:videoID/note/:id`, (req, res) => {
      let videoID = req.params.videoID,
          noteID = req.params.id;

      VideoData.update({_id: videoID}, {$pull: {"notes": {_id: noteID}}}, (err, data) => {
          if ( err ) { throw err; }
          res.send(`Deleted note ${noteID}`);
      });
  });


};

