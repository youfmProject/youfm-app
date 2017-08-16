import React, { Component } from 'react';
import classNames from 'classnames';
import Playlist from './Playlist';

export default class Search extends Component {

  render() {

    const {dispatch, searchKey, searchKeyword, onSearch, getSpotifySearch, tracks, searchView, getHomeData} = this.props; 

    let onChange = function(e){
        dispatch(searchKeyword(e.target.value));
    }

    let onClick = function(e){
      if(e.key === 'Enter'){
         dispatch(getSpotifySearch(searchKey));
      }
    }

    let homeSearch = (
      <div className={classNames('banner--main')}>
        <div className={classNames('banner__content')}>
          <p className={classNames('banner__logo')}/>
          <input className={classNames('banner__search')} value = {searchKey} onChange= {onChange.bind(this)} placeholder="Type in a song or artist name" onKeyPress={onClick.bind(this)}/>
        </div>
      </div>
    );
      
    let ContextSearch = (
      <div className={classNames("songs__search")} >
        <div className={classNames("songs__search__field")}>
          <span className={classNames("icon-search-icon songs__search__icon-1")}/>
            <input className={classNames("songs__search__input")} style={{width:'95%'}} type="text" placeholder="Type in a song or artist name" value = {searchKey} onChange= {onChange.bind(this)} onKeyPress={onClick.bind(this)}/>
          <span className={classNames("icon-enter-icon songs__search__icon-2")} style={{right: '8em'}}>Press &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; enter to search</span>
        </div>
      </div>
    );
    return (
      <div>
        {searchView === 'home' ? homeSearch : ContextSearch}  
      </div>
    );
  }
}