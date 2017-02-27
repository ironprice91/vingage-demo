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

  getNotes() {
      let noteMarkup = [];
      this.props.video.notes.forEach((note) => {
          noteMarkup.push(<Note key={note._id} note={note.note} displayTime={note.displayTime} time={note.time}></Note>);
      });

      this.sortNoteTime(noteMarkup);
      return noteMarkup;
  }

  addNote(event) {
    event.preventDefault();
    let videoEl = document.getElementById(this.props.video._id),
        note = null;

    axios.post("http://localhost:6060/api/video/note", {
      "id": this.props.video._id,
      "time": parseFloat(videoEl.currentTime).toFixed(2),
      "displayTime": this.convertToDisplayTime(videoEl.currentTime),
      "note": this.state.note
    }).then((res) => {

        note = res.data;

        this.setState({
          "notes": this.state.notes.concat([<Note key={note._id} note={note.note} displayTime={note.displayTime} time={note.time}></Note>]).sort((a,b) => a.props.time > b.props.time),
          "note": ""
        });

    }).catch((err) => {
        if ( err ){ throw err; }
    });
  }

  convertToDisplayTime(float) {
    let min = Math.floor(float / 60),
        seconds = float - (min * 60),
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

  render() {

    return (
      <div>
        <form id="newNoteForm" onSubmit={this.addNote.bind(this)}>
          <input type="text" placeholder="Add your note here" onChange={this.handleChange.bind(this)} value={this.state.note}/>
        </form>
        <ul>
          {this.state.notes}
        </ul>
      </div>
    );
  }
}
