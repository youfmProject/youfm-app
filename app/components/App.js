import React, { Component, PropTypes } from 'react';
import SideBar from './SideBar';
import Player from './Player';
import Search from './Search';
import classNames from 'classnames';
import { batchActions } from 'redux-batched-actions';

export default class App extends Component {

  componentDidUpdate(){
    this.checkForPlayerID();
  } 

  componentWillMount(){
    const {dispatch, setVolume, addToHistory, setLocalStore, user} = this.props;
    let ls = localStorage.getItem('liveJam');
    if(ls){
      ls= JSON.parse(ls);
      //User login details to be added here
      dispatch(batchActions([setVolume(ls.volume),addToHistory(ls.history,false)]));
    }
    else{
      setLocalStore({history:[],volume:0.5,userStatus:{userId: user.userId, status: user.status}})
      dispatch(setVolume(0.5));
    }
  }

  componentDidMount(){
    const {dispatch,isSearchInSync, getSpotifySearch} = this.props;
    this.checkForPlayerID();
  }

  checkForPlayerID(){
    const {dispatch,isPlayerInSync,playerPlay, isPlayerPlaying, bootPlayer, togglePlay} = this.props;
    isPlayerInSync ? dispatch(playerPlay(isPlayerInSync)) : null;
    !isPlayerPlaying ? dispatch(bootPlayer(isPlayerInSync)): null;
  }
  
  render() {
    const {children, store} = this.props;
    return (
      <div className={classNames("rails " + (this.props.isPlayerPlaying ? 'video' : 'novideo'))}>
        <div className={classNames('rail', 'rail--center')}>
          <Search {...this.props}/>
          <Player {...this.props} />   
          <div className="maincontent">{ children } </div>
        </div>
        <div className={classNames('rail', 'rail--left')}>
          <SideBar {...this.props} />
        </div>
      </div>
    );
  }
}