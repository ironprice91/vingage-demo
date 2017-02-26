import React, { Component } from 'react';

export default class VideoList extends Component {
  constructor(props) {
    super(props);
  }

  getVideoList() {
    let videoList = [];
    this.props.videos.forEach((video) => {
      videoList.push(<li key={video._id}>{video.videoSrc}</li>);
    });

    return videoList;
  }

  render() {
    if ( this.props.videos.length === 0 ) { return null; }
    return (
      <div>
        <div>This is a list of videos</div>
        <ul>
          {this.getVideoList()}
        </ul>
      </div>
    );
  }
}
