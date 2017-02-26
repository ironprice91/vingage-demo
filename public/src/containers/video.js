import React, { Component } from 'react';

export default class Video extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <video src={this.props.video.videoSrc} controls></video>
      </div>
    );
  }
}
