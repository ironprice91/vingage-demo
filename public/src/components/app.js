import React, { Component } from 'react';
import Video from '../containers/video';
import NoteHolder from '../containers/noteHolder';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>React simple starter</div>
        <Video/>
        <NoteHolder/>
      </div>
    );
  }
}
