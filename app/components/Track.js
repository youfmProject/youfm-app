import React, { Component } from 'react';
import { batchActions } from 'redux-batched-actions';
import { browserHistory } from 'react-router'
import classNames from 'classnames';

export default class Track extends Component {
  render() {
    const {track, instantPlay, addToQueue, dispatch, location, playlistName} = this.props;
    var songClass = classNames('song');
    return (
    <div key={track.id} className={songClass}>
        <span className={classNames('song__play')}>
            <i className="icon-play-icon" onClick={()=> {
                dispatch(instantPlay(track.name+' '+track.artist, playlistName))}}>
            </i>
        </span>
        <span className={classNames('song__favorite')}> Fav </span>
        <span className={classNames('song__num')}>#</span>
        <span className={classNames('song__art')}>art</span>
        <span className={classNames('song__name')}>{track.name}</span>
        <span className={classNames('song__artists')}>{track.artist}</span>
        <span className={classNames('song__actions')}>...</span>
		</div>
    );
  }
}