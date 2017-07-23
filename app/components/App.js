import React, { Component, PropTypes } from 'react';
import SideBar from './SideBar';
import Player from './Player';
import Search from './Search';
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
        <Search {...this.props}/>
        {children}
      </div>
    );
  }
}