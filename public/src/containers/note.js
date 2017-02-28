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

  setVideoTime(target, e) {
    e.preventDefault();
    let videoID = e.target.getAttribute("data-video-id");
    document.getElementById(videoID).currentTime = this.props.time;

    if ( !target().target ) { return; }
    target().target.seekTo(this.props.time);

  }

  render() {
    let noteID = this.props.id;
    let note = this.props.note;
    let noteMarkup = (this.state.edit) ? [
      <div key={`${noteID}-editor`}>
        <p className="lead"><span>Editing Note @ {this.props.displayTime}</span></p>
        <form onSubmit={this.props.edit.bind(this, this.toggleEdit.bind(this))} data-video-id={this.props.videoID} data-note-id={`${noteID}`}>
          <textarea className="edit-note-form form-control col-sm-12" cols="30" rows="3" value={this.state.noteText} onChange={this.handleChange.bind(this)}></textarea>
          <button  type="submit" className="btn btn-success btn-xs" data-video-id={this.props.videoID} data-note-id={`${noteID}`}>Submit</button>
        </form>
      </div>
    ] : [
      <div key={`${noteID}-note-time`}>
        <p className="lead" >
          <a data-video-id={this.props.videoID} href="#" onClick={this.setVideoTime.bind(this, this.props.youtube)}>{this.props.displayTime}</a> - {this.state.noteText}
        </p>
        <button  type="button" className="btn btn-success btn-xs" data-video-id={this.props.videoID} data-note-id={`${noteID}`} onClick={this.toggleEdit.bind(this)}>Edit</button>
      </div>
    ];

    return (
      <div id={`note-id-${noteID}`}>
        <li
          className="list-group-item"
          data-videoid={this.props.videoID}
          data-note-time={this.props.time}>

          <a href="#" className="delete" data-video-id={this.props.videoID} data-note-id={this.props.id} onClick={this.props.delete}>x</a>

          {noteMarkup}

        </li>
      </div>
    );
  }
}