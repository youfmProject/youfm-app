import React, { Component } from 'react';
import { batchActions } from 'redux-batched-actions';
import classNames from 'classNames';
import { Link } from 'react-router'
import Playlist from './Playlist';

export default class Search extends Component {

  render() {
    const {dispatch, searchKey, searchKeyword, onSearch, getSpotifySearch, tracks, searchView, getHomeData} = this.props; 
    
    let onChange = function(e){ 
      dispatch(searchKeyword(e.target.value));
    }

    let onClick = function(){
      dispatch(getSpotifySearch(searchKey));
    }

    let homeSearch = (
      <div className={classNames('banner--main')}>
      <div className={classNames('banner__content')}>
        <form onSubmit={onClick.bind(this)}>
          <Link to="/search" activeClassName="active" onlyActiveOnIndex={true}>
            <input className={classNames('banner__search')} value = {searchKey} onChange= {onChange.bind(this)} placeholder="Search song"/>
          </Link>
        </form>
      </div>
      </div>
    );
      
      let ContextSearch = (
        <div className={classNames("songs__search")} style = {{marginLeft: '5em'}}>
          <div className={classNames("songs__search__field")}>
            <span className={classNames("icon-search-icon songs__search__icon-1")}/>
             
                <Link to="/search" activeClassName="active" onlyActiveOnIndex={true}>
                  <input className={classNames("songs__search__input")} style={{width:'95%'}} type="text" placeholder="Type in a song or artist name" value = {searchKey} onChange= {onChange.bind(this)}/>
                </Link>
            <span className={classNames("icon-enter-icon songs__search__icon-2")} style={{right: '8em'}}>Press &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; enter to search</span>
            <button style={{marginRight: '-100px'}} onClick={onClick.bind(this)}>search</button>
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