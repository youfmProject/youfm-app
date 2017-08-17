import React, { Component } from 'react';
import Track from './Track';
import DragSortableList from 'react-drag-sortable'
import classNames from 'classnames';
export default class SearchList extends Component {

componentDidMount() {
  const {tracks,getSpotifySearch, searchArtist, dispatch, params, error} = this.props;
  let list = params.list.split('-')[0];
  if(!tracks.length && !error){
    if(list === 'track'){
      return dispatch(getSpotifySearch(params.list));      
    }
    else {
      return dispatch(searchArtist(params.list));
    }
  }
}
    
  buildPlaylist(tracks = []){
    let fields=[];
    tracks.map((track)=>{
      fields.push({content: (<Track track={track} {...this.props} playlistName={'search'}/>)});
    })
    return fields;
  }

  render() {
    const { tracks, error } = this.props;
    var playlistClass = classNames('song-list', 'song');
        let onSort = function(sortedList) {
      // fire action to reset store order
    }
    var empty = (<div className={classNames("empty")}>
	      <i className={classNames("empty__icon--history")} aria-hidden="true"></i>
	      <div className={classNames("empty__title")}>No results found....</div>
      </div>);
    var trackList =(<div className={playlistClass}>
        <DragSortableList items={this.buildPlaylist(tracks)} onSort={onSort} type="vertical"/>
      </div>);
    return (
      <div>
        {error ? empty : trackList}
      </div>
    );
  }
}