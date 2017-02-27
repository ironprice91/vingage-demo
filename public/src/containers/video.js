import React, { Component } from 'react';

export default class Video extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="col-lg-8 col-md-12 col-sm-12">
        <h3>{this.props.video.title}</h3>
        <div className="embed-responsive embed-responsive-16by9">
          <video className="embed-responsive-item" id={this.props.video._id} src={this.props.video.videoSrc} controls></video>
        </div>
      </div>
    );
  }
}
