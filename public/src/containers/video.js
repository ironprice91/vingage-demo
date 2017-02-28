import React, { Component } from 'react';
import YouTube from 'react-youtube';

export default class Video extends Component {
  constructor(props) {
    super(props);
  }

  videoPlayer() {
    let player = <video className="embed-responsive-item" id={this.props.video._id} src={this.props.video.videoSrc} controls></video>;

    if ( this.props.player === "youtube" ) {
      player = <YouTube id={this.props.video._id} videoId={this.extractYoutubeID(this.props.video.videoSrc)} onReady={e => this.props.getData(e)}/>;
    }

    return player;

  }

  extractYoutubeID(url) {
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = url.match(regExp);
    return ( match && match[7].length === 11)? match[7] : false;
  }

  render() {

    return (
      <div className="col-lg-8 col-md-12 col-sm-12">
        <h3>{this.props.video.title}</h3>
        <div className="embed-responsive embed-responsive-16by9">
          {this.videoPlayer()}
        </div>
      </div>
    );
  }
}

