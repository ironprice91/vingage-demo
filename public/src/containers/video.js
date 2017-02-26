import React, { Component } from 'react';

export default class Video extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <h3>{this.props.video.title}</h3>
        <video id={this.props.video._id} src={this.props.video.videoSrc} controls></video>
      </div>
    );
  }
}
