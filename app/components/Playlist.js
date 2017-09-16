import React, { Component } from 'react';
import DragSortableList from 'react-drag-sortable'
import { Glyphicon } from 'react-bootstrap';
import classNames from 'classnames';
import Track from './Track';
export default class Playlist extends Component {
    
  componentDidMount() {
    const {dispatch, getSpotifySearch, searchArtist, playlistName, getRedditList, params, errors} = this.props;
    switch(playlistName){
      case 'r': {
        return dispatch(getRedditList(params.list));  
      }
      case 'search': {
        let list = params.list.split('-');
        if(!errors){
          if(list[0] === 'track'){
            return dispatch(getSpotifySearch(list[1]));
          }
          else if(list[0] === 'artist') {
            return dispatch(searchArtist('',list[1], 'artist'));
          }
          else {
            return dispatch(searchArtist('',list[1], 'album'));
          }
        }
      }
      default: {
        break;
      }
    }
  }


  buildPlaylist(tracks = [], playlistName){
    let fields=[];
    tracks.map((track, key)=>{
      fields.push({content: (<Track key={key} index={key} track={track} playlistName={playlistName} {...this.props}/>)});
    })
    return fields
  }

  render() {
    const { trackList, playlistName, dispatch, resetPlaylistOrder, errors } = this.props;
    let onSort = function(sortedList) {
      dispatch(resetPlaylistOrder(playlistName,sortedList));
    }
    var playlistClass = classNames('song-list', 'song');
    var empty = (<div className={classNames("empty")}>
	      <i className={classNames("empty__icon--history")} aria-hidden="true"></i>
	      <div className={classNames("empty__title")}>No results found....</div>
      </div>);
    var tracks =(<div className={playlistClass} style={{cursor: 'default', marginBottom:'67px'}}>
        <DragSortableList items={this.buildPlaylist(trackList, playlistName)} onSort={onSort} type="vertical"/>
      </div>);
    return (
      <div>
        {(errors||!trackList.length) ? empty : tracks}
      </div>
      );
  }
}