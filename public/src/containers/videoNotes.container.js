import React, { Component } from 'react';
import Video from './video';
import NoteHolder from './noteHolder';


export default class VideoNotesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "featuredVideo" : this.props.videos[0]
    };
  }

  // to do is to filter for youtube or natve html5
  render() {
    return (
      <div className="row">
        <Video video={this.state.featuredVideo}/>
        <NoteHolder video={this.state.featuredVideo}/>
      </div>
    );
  }
}
