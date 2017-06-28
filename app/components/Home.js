import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';


export default class Home extends Component {

  hityoutubeSearch(){
    const {getYoutubeSearch, dispatch} = this.props;
    dispatch(getYoutubeSearch());
  }

  hitspotifySearch(){
    const {getSpotifySearch, dispatch} = this.props;
    dispatch(getSpotifySearch());
  }

  render() {
    return (
      <div>
        <h1> Welcome to youfm.org </h1>
        <button onClick={()=>{this.hityoutubeSearch()}}>Search youtube</button>
        <button onClick={()=>{this.hitspotifySearch()}}>Search spotify</button>
      </div>
    );
  }
}
