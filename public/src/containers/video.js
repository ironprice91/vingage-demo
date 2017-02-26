import React, { Component } from 'react';

export default class Video extends Component {
  render() {
    if ( this.props.videos.length === 0 ) { return null; }
    return (
      <div>
        <div>This is where the video will live!</div>
        <video src={this.props.videos[2].videoSrc} controls></video>
      </div>
    );
  }
}
