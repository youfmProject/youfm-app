import React, { Component, PropTypes } from 'react';
import SideBar from './SideBar';
import Player from './Player';
import Search from './Search';
import classNames from 'classNames';
import path from 'path';
import {Grid, Col, Row} from 'react-bootstrap';
export default class App extends Component {

  componentDidMount(){
    const {dispatch,inSync,playerPlay} = this.props;
    inSync ? dispatch(playerPlay(inSync)) : null;
  } 

  render() {
    const {children} = this.props;
    return (
      <div className = {classNames('rails')}>
        <div className={classNames('rail', 'rail--left')}>
          <SideBar />
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