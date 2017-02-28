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
      "index" : 0,
      "show": false
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

  toggleVideos(e) {
    e.preventDefault();
    if ( !this.state.show ) {
      this.setState({"show": true});
    } else {
      this.setState({"show": false});
    }
  }

  render() {
    if ( !this.state.getVideos ) {
      this.getVideos();
      return null;
    }


    return (
      <div>

        <nav className="vingage-nav navbar navbar-inverse">
          <div href="#" className="vingage-brand navbar-brand">Vingage Demo</div>
          <ul className="nav navbar-nav">
            <li>
              <a onClick={this.toggleVideos.bind(this)} href="#">Videos</a>
            </li>
          </ul>
        </nav>
        <div className="container">
          <VideoList videos={this.state.videos} click={this.setIndex.bind(this)} show={this.state.show}/>
          <VideoNotesContainer videos={this.state.videos} activeVideo={this.state.index}/>
        </div>
      </div>
    );
  }
}
