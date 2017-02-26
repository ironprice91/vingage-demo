import React, { Component } from 'react';
import Video from '../containers/video';
import NoteHolder from '../containers/noteHolder';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "getVideosCalled" : false,
      "videos" : []
    };
  }

  getVideos() {
    axios.get("http://localhost:6060/api/video/all")
      .then((res) => {
        console.log(res.data);
        this.setState({"getVideosCalled": true});
        this.setState({"videos": res.data});
      });
  }

  render() {
    if ( !this.state.getVideosCalled ) {
      this.getVideos();
    }

    return (
      <div>
        <div>React simple starter WHY yesss</div>
        <Video videos={this.state.videos}/>
        <NoteHolder/>
      </div>
    );
  }
}
