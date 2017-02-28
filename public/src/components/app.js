import React, { Component } from 'react';
import VideoList from '../containers/videoList';
import VideoNotesContainer from '../containers/videoNotes.container';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "videos" : [],
      "getVideos": false,
      "index" : 0
    };
  }

  getVideos() {
    axios.get("http://localhost:6060/api/video/all")
      .then((res) => {
        this.setState({
          "videos": res.data,
          "getVideos": true
        });
      });
  }

  setIndex(index) {
    this.setState({"index": index});
  }

  render() {
    if ( !this.state.getVideos ) {
      this.getVideos();
      return null;
    }

    return (
      <div>

        <nav className="vingage-nav navbar navbar-inverse">
          <div href="#" className="navbar-brand">Vingage Demo</div>
          <ul className="nav navbar-nav">
            <li>
              <a href="#">Videos</a>
            </li>
          </ul>
        </nav>
        <div className="container">
          <VideoList videos={this.state.videos} click={this.setIndex.bind(this)}/>
          <VideoNotesContainer videos={this.state.videos} activeVideo={this.state.index}/>
        </div>
      </div>
    );
  }
}
