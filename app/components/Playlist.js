import React, { Component } from 'react';
import DragSortableList from 'react-drag-sortable'
import { Glyphicon } from 'react-bootstrap';
import classNames from 'classnames';
import Track from './Track';
export default class Playlist extends Component {
    
  buildPlaylist(tracks = []){
    let fields=[];
    tracks.map((track)=>{
      fields.push({content: (<Track track={track} {...this.props}/>)});
    })
    return fields
  }

  render() {
    const { trackList } = this.props;

    let onSort = function(sortedList) {
      // fire action to reset store order
    }
    var playlistClass = classNames('song-list', 'song');
    return (
      <div className={playlistClass}>
        <DragSortableList items={this.buildPlaylist(trackList)} onSort={onSort} type="vertical"/>
      </div>
      );
  }
}