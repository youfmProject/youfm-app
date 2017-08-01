import React, { Component } from 'react';
import Track from './Track';
import DragSortableList from 'react-drag-sortable'
import classNames from 'classNames';
export default class SearchList extends Component {

    
  buildPlaylist(tracks = []){
    let fields=[];
    tracks.map((track)=>{
      fields.push({content: (<Track track={track} {...this.props}/>)});
    })
    return fields
  }

  render() {
    const { tracks } = this.props;
    var playlistClass = classNames('song-list', 'song');
        let onSort = function(sortedList) {
      // fire action to reset store order
    }
    return (
     <div className={playlistClass}>
        <DragSortableList items={this.buildPlaylist(tracks)} onSort={onSort} type="vertical"/>
      </div>
      );
  }
}