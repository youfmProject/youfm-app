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
        <Grid style = {{margin: '10px', padding: '5px'}} fluid = {true}>
          <Row>
            <Col xs={1} md={2} style = {{marginLeft:'10px'}}>
              <Row>
                <SideBar />
              </Row>
              <Row style ={{paddingBottom:'100px'}}>
                <Player {...this.props} />
              </Row>
              <Row>
                {''}
              </Row>
            </Col>
            <Col md={9} xs={4} className ={classNames('rail', 'rail--center')} style={{marginLeft: '30px'}}>
              <Search {...this.props}/>
              {children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}