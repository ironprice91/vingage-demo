import React, { Component } from 'react';

export default class VideoList extends Component {
  constructor(props) {
    super(props);
  }

  getVideoList() {
    let videoList = [];
    this.props.videos.forEach((video) => {
      videoList.push(<li key={video._id} data-video-src={video.videoSrc}><img src={video.thumbnail} alt=""/></li>);
    });

    return videoList;
  }

  render() {

    if ( this.props.videos.length === 0 ) { return null; }
    return (
      <div>
        <ul className="list-inline">
          {this.getVideoList()}
        </ul>
      </div>
    );
  }
}
