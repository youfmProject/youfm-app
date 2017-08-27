import React, { Component, PropTypes } from 'react';
import SideBar from './SideBar';
import Player from './Player';
import Search from './Search';
import AppModal from './AppModal'
import classNames from 'classnames';
export default class App extends Component {

  componentDidUpdate(){
    this.checkForPlayerID();
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
    const {children, store, showLogin} = this.props;
    return (
      <div className = {classNames('rails')}>
        
        <div className={classNames('rail', 'rail--center')}>
          <Search {...this.props}/>
          {showLogin ? null : children } 
          <Player {...this.props} />   
        </div>
        <div className={classNames('rail', 'rail--left')}>
          <SideBar {...this.props} />
        </div>
        <AppModal {...this.props}>
					{children ? React.cloneElement(children, {store}): null}
			  </AppModal>
      </div>
    );
  }
}