import React, { Component } from 'react';
import axios from 'axios';

export default class Note extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    let noteID = this.props.id;

    return (
      <div id={`note-id-${noteID}`}>
        <li
          data-videoid={this.props.videoID}
          data-note-time={this.props.time}>
          {this.props.note} @ {this.props.displayTime}
          <button data-video-id={this.props.videoID} data-note-id={`${noteID}`} onClick={this.props.delete}>delete</button>
        </li>
      </div>
    );
  }
}