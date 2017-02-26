import React, { Component } from 'react';

export default class Note extends Component {
  render() {
    return (
      <li data-note-time={this.props.time}>{this.props.note} @ {this.props.displayTime}</li>
    );
  }
}