import React, { Component, PropTypes } from 'react';
import SideBar from './SideBar';
import Player from './Player';
import Search from './Search';
import classNames from 'classNames';
import path from 'path';
import {Grid, Col, Row} from 'react-bootstrap';
export default class App extends Component {

  componentDidUpdate(){
      this.checkForPlayerID();
  } 

  componentDidMount(){
    this.checkForPlayerID();
  }

  checkForPlayerID(){
    const {dispatch,inSync,playerPlay, playerHasBooted,bootPlayer} = this.props;
    inSync ? dispatch(playerPlay(inSync)) : null;
    !playerHasBooted ? dispatch(bootPlayer(inSync)): null;
  }

  render() {
    const {children} = this.props;
    return (
      <div className = {classNames('rails')}>
        <div className={classNames('rail', 'rail--left')}>
          <SideBar {...this.props} />
          </div>
          <Player {...this.props} />
          <div className={classNames('rail', 'rail--center')}>
             <Search {...this.props}/>
             {children}
             
          </div>
      </div>
    );
  }
}