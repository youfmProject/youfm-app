import React, { Component } from 'react';
import SideBar from './SideBar';
import Player from './Player';

export default class Playlist extends Component {
  render() {
    return (
    	<div>
    		PLAYLIST
    		<h2>{this.props.params.list}</h2>
    		<h2>{this.props.params.play}</h2>
		</div>
    );
  }
}