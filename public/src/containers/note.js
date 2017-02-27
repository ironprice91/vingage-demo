import React, { Component } from 'react';
import axios from 'axios';

export default class Note extends Component {
  constructor(props) {
      super(props);
      this.state = {
          "edit": false,
          "noteText": props.note
      };
  }

  toggleEdit() {
    if ( !this.state.edit ) {
      this.setState({"edit": true});
    } else {
      this.setState({"edit": false});
    }
  }

  handleChange(e) {
    this.setState({
      "noteText": e.target.value
    });
  }

  render() {
    let noteID = this.props.id;
    let note = this.props.note;
    let noteMarkup = (this.state.edit) ? [
      <div>
        <p><span>Editing Note @ {this.props.displayTime}</span></p>
        <form onSubmit={this.props.edit.bind(this, this.toggleEdit.bind(this))} data-video-id={this.props.videoID} data-note-id={`${noteID}`}>
          <input name="" id="" cols="30" rows="3" value={this.state.noteText} onChange={this.handleChange.bind(this)}></input>
        </form>
      </div>
    ] : [<p><span>{this.props.displayTime}</span> - {this.state.noteText}</p>];

    return (
      <div id={`note-id-${noteID}`}>
        <li
          data-videoid={this.props.videoID}
          data-note-time={this.props.time}>
          {noteMarkup}
          <button data-video-id={this.props.videoID} data-note-id={`${noteID}`} onClick={this.props.delete}>Delete</button>
          <button data-video-id={this.props.videoID} data-note-id={`${noteID}`} onClick={this.toggleEdit.bind(this)}>Edit</button>
        </li>
      </div>
    );
  }
}