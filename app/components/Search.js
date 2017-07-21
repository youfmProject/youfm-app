import React, { Component } from 'react';
import SideBar from './SideBar';
import Player from './Player';

export default class Search extends Component {

  componentDidMount(){
    const {dispatch,inSync,playerPlay} = this.props;
    inSync ? dispatch(playerPlay(inSync)) : null;
  }

  render() {
    return (
      <div>
      	SEARCH
      <SideBar />
      <Player {...this.props} />
      </div>
    );
  }
}