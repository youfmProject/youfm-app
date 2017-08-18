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
    const { queue, dispatch, resetPlaylistOrder, playIndex, remainingQueue } = this.props;
    let playlistClass = classNames('song-list', 'song');
    let onSort = function(sortedList) {
      let mergedList = queue.slice(0,playIndex).concat(sortedList);
      dispatch(resetPlaylistOrder('nowPlaying',mergedList));
    }
    if(queue.length !== 0){
      return(
        <div>
          <div>
            <p className={classNames('nowPlaying-Info')}>Now Playing</p>
            <div className={playlistClass} style={{cursor: 'default',marginBottom:'10px'}}>
              <Track track={queue[playIndex]} playlistName='nowPlaying' {...this.props}/>
            </div>
          </div>
          <div>
            <p className={classNames('nowPlaying-Info')}>Up Next</p>
            <div className={playlistClass} style={{cursor: 'default'}}>
              <DragSortableList items={this.buildPlaylist(remainingQueue, 'nowPlaying')} onSort={onSort} type="vertical"/>
            </div>
          </div>
        </div>
      )
    }
    else{
      // empty now playing image
      return null;
    }
  }
}