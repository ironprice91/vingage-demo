import React, { Component } from 'react';
import Note from './note';

export default class NoteHolder extends Component {
  render() {
    return (
      <div>
        <div>This is the parent container of notes</div>
        <Note></Note>
      </div>
    );
  }
}
