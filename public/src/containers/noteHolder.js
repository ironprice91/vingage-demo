import React, { Component } from 'react';
import Note from './note';
import axios from 'axios';

export default class NoteHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
        "note": null,
        "getNotes": true,
        "notes" : this.getNotes()
    };

    this.addNote.bind(this);
    this.handleChange.bind(this);
  }

  getNotes(nextProps) {
      let noteMarkup = [];
      let videoID = (nextProps) ? nextProps.video._id : this.props.video._id;
      let notes = (nextProps) ? nextProps.video.notes : this.props.video.notes;

      notes.forEach((note) => {
          noteMarkup.push(
            <Note
              videoID={videoID}
              key={note._id}
              note={note.note}
              displayTime={note.displayTime}
              time={note.time}
              id={note._id}
              delete={this.deleteNote.bind(this)}
              edit={this.saveEditedNote.bind(this)}
              youtube={(function(){return (nextProps) ? nextProps.youtube : this.props.youtube}).bind(this)}>
            </Note>);
      });

      this.sortNoteTime(noteMarkup);
      return noteMarkup;
  }

  addNote(type, youtube, event) {
    event.preventDefault();

    let videoEl = document.getElementById(this.props.video._id),
        videoID = this.props.video._id,
        currentTime = (type === "youtube") ? youtube.target.getCurrentTime() : videoEl.currentTime,
        note = null;

    let baseURL = process.env.NODE_ENV === "dev" ? "http://localhost:6060" : "";

    axios.post("${baseURL}/api/video/note", {
      "id": this.props.video._id,
      "time": parseFloat(currentTime).toFixed(2),
      "displayTime": this.convertToDisplayTime(currentTime, type),
      "note": this.state.note
    }).then((res) => {

        note = res.data;

        this.setState({
          "notes": this.state.notes.concat([<Note
            videoID={videoID}
            key={note._id}
            note={note.note}
            displayTime={note.displayTime}
            time={note.time}
            id={note._id}
            delete={this.deleteNote.bind(this)}
            edit={this.saveEditedNote.bind(this)}
            youtube={(function(){return this.props.youtube}).bind(this)}></Note>]).sort((a,b) => a.props.time > b.props.time),
          "note": ""
        });

    }).catch((err) => {
        if ( err ){ throw err; }
    });
  }

  deleteNote(e) {
    e.preventDefault();

    let baseURL = process.env.NODE_ENV === "dev" ? "http://localhost:6060" : "";
    let videoID = e.target.getAttribute("data-video-id");
    let noteID = e.target.getAttribute("data-note-id");
    let deleteURL = `${baseURL}/api/video/${videoID}/note/${noteID}`;
    let updatedNoteState = this.state.notes.filter(note => noteID !== note.key);

    axios.delete(deleteURL).then((res) => {
        this.setState({
          "notes": updatedNoteState
        });
    }).catch((err) => {
      if ( err ) { throw err; }
    });

  }

  saveEditedNote(callback, e) {

      e.preventDefault();
      let baseURL = process.env.NODE_ENV === "dev" ? "http://localhost:6060" : "";
      let videoID = e.target.getAttribute("data-video-id");
      let noteID = e.target.getAttribute("data-note-id");
      let newNote = e.target.firstChild.value;
      let editURL = `${baseURL}/api/video/${videoID}/note/${noteID}`;

      axios.post(editURL, {"note": newNote}).then((res) => {
        if ( typeof callback === "function" ) { callback(); }
      }).catch((err) => {
        if ( err ) { throw err; }
      });
  }

  convertToDisplayTime(num, type) {
    let min = Math.floor(num / 60),
        seconds = num - (min * 60),
        roundedSeconds = Math.floor(seconds),
        secondsArray = roundedSeconds.toString().split('');

    return (secondsArray.length === 1) ? `${min}:0${roundedSeconds}` : `${min}:${roundedSeconds}`;
  }

  sortNoteTime(notes) {
    notes.sort((a,b) => {
      return a.props.time > b.props.time;
    });
  }

  handleChange(event) {
    this.setState({
      "note": event.target.value
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({"notes": this.getNotes(nextProps)});
  }

  render() {

    return (
      <div className="col-lg-4 col-md-4 col-sm-12">
        <h3>Notes</h3>
        <ul className="list-group">
          {this.state.notes}
        </ul>
        <form id="newNoteForm" onSubmit={this.addNote.bind(this, this.props.player, this.props.youtube)}>
          <input className="form-control col-sm-12 input-lg" type="text" placeholder="Add your note here" onChange={this.handleChange.bind(this)} value={this.state.note}/>
        </form>
      </div>
    );
  }
}
