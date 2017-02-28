import React, { Component } from 'react';

export default class VideoList extends Component {
  constructor(props) {
    super(props);
  }

  getVideoList() {
    let videoList = [];
    this.props.videos.forEach((video, index) => {
      videoList.push(<li key={video._id} onClick={this.props.click.bind(this, index)} data-video-src={video.videoSrc}><img src={video.thumbnail} alt=""/></li>);
    });

    return videoList;
  }

  render() {
    let show = this.props.show ? "show-videos" : "hide-videos";
    let classString = `video-list list-inline ${show}`;
    if ( this.props.videos.length === 0 ) { return null; }
    return (
      <div>
        <ul className={classString}>
          {this.getVideoList()}
        </ul>
      </div>
    );
  }
}
