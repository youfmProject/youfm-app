import React, { Component, PropTypes } from 'react';
import SideBar from './SideBar';
import Player from './Player';

export default class App extends Component {

  componentDidMount(){
    const {dispatch,inSync,playerPlay} = this.props;
    inSync ? dispatch(playerPlay(inSync)) : null;
  } 

  render() {
    const {children} = this.props;
    return (
      <div>
        <SideBar />
        <Player {...this.props} />
        {children}
      </div>
    );
  }
}