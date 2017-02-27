import React, { Component } from 'react';
import Note from './note';
import axios from 'axios';

export default class NoteHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
        "note": null
    };

    this.addNote.bind(this);
    this.handleChange.bind(this);
  }

  getNotes() {
      let noteMarkup = [];
      this.props.video.notes.forEach((note) => {
          noteMarkup.push(<Note key={note._id} note={note.note} displayTime={note.displayTime} time={note.time}></Note>);
      });

      return noteMarkup;
  }

  addNote(event) {
    event.preventDefault();

    let videoEl = document.getElementById(this.props.video._id);
    axios.post("http://localhost:6060/api/video/note", {
      "id": this.props.video._id,
      "time": parseFloat(videoEl.currentTime).toFixed(2),
      "displayTime": this.convertToDisplayTime(videoEl.currentTime),
      "note": this.state.note
    });
  }

  convertToDisplayTime(float) {
    let min = Math.floor(float / 60),
        seconds = float - (min * 60),
        roundedSeconds = Math.floor(seconds),
        secondsArray = roundedSeconds.toString().split('');

    return (secondsArray.length === 1) ? `${min}:0${roundedSeconds}` : `${min}:${roundedSeconds}`;
  }

  handleChange(event) {
    this.setState({
      "note": event.target.value
    });
  }

  render() {

    return (
      <div>
        <form onSubmit={this.addNote.bind(this)}>
          <input type="text" placeholder="Add your note here" onChange={this.handleChange.bind(this)} value={this.state.note}/>
        </form>
        <ul>
          {this.getNotes()}
        </ul>
      </div>
    );
  }
}
