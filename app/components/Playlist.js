import React, { Component } from 'react';
import DragSortableList from 'react-drag-sortable'
import { Glyphicon } from 'react-bootstrap';
import classNames from 'classnames';
import Track from './Track';
export default class Playlist extends Component {
    
  buildPlaylist(tracks = [], playlistName){
    let fields=[];
    tracks.map((track, key)=>{
      fields.push({content: (<Track key={key} track={track} playlistName={playlistName} {...this.props}/>)});
    })
    return fields
  }

  render() {
    const { trackList, playlistName, dispatch, resetPlaylistOrder, activetrack } = this.props;
    let onSort = function(sortedList) {
      dispatch(resetPlaylistOrder(playlistName,sortedList));
    }
    var playlistClass = classNames('song-list', 'song');
    return (
      <div className={playlistClass} style={{cursor: 'default', marginBottom:'67px'}}>
        <DragSortableList items={this.buildPlaylist(trackList, playlistName)} onSort={onSort} type="vertical"/>
      </div>
      );
  }
}