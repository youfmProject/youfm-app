import React, { Component } from 'react';
import SideBar from './SideBar';
import Player from './Player';

export default class Home extends Component {

  render() {
    return (
      <div>
      	HOME PAGE 
      <SideBar />
      <Player />
      </div>
    );
  }
}
