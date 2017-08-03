import React, { Component } from 'react';
import DragSortableList from 'react-drag-sortable'
import { Glyphicon } from 'react-bootstrap';
import classNames from 'classnames';
import Track from './Track';
export default class Playlist extends Component {
    
  buildPlaylist(tracks = [], playlistName){
    let fields=[];
    tracks.map((track)=>{
      fields.push({content: (<Track track={track} playlistName={playlistName} {...this.props}/>)});
    })
    return fields
  }

  render() {
    const { trackList, playlistName } = this.props;
    let onSort = function(sortedList) {
      // fire action to reset store order
    }
    var playlistClass = classNames('song-list', 'song');
    return (
      <div className={playlistClass}>
        <DragSortableList items={this.buildPlaylist(trackList, playlistName)} onSort={onSort} type="vertical"/>
      </div>
      );
  }
}