import React, { Component } from 'react';
import Video from './video';
import NoteHolder from './noteHolder';


export default class VideoNotesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "youtubeData" : null
    };
  }

  filterPlayer() {
    let videoSrc = this.props.videos[this.props.activeVideo].videoSrc;
    let videoType = "native";

    if ( videoSrc.match(/youtube/) && videoSrc.match(/youtube/).length === 1 ) {
      videoType = "youtube";
    }
    return videoType;
  }

  getData(e) {
    this.setState({"youtubeData": e});
  }

  // to do is to filter for youtube or natve html5
  render() {
    return (
      <div className="row">
        <Video player={this.filterPlayer()} video={this.props.videos[this.props.activeVideo]} getData={this.getData.bind(this)}/>
        <NoteHolder player={this.filterPlayer()} video={this.props.videos[this.props.activeVideo]} youtube={this.state.youtubeData}/>
      </div>
    );
  }
}
