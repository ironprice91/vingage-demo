import React, { Component } from 'react';
import Note from './note';

export default class NoteHolder extends Component {
  getNotes() {
      let noteMarkup = [];
      console.log(this.props.video);
      this.props.video.notes.forEach((note) => {
          noteMarkup.push(<Note key={note._id} note={note.note} displayTime={note.displayTime} time={note.time}></Note>);
      });

      return noteMarkup;
  }
  render() {
    return (
      <div>
        <div>This is the parent container of notes</div>
        <ul>
          {this.getNotes()}
        </ul>
      </div>
    );
  }
}
