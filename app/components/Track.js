import React, { Component } from 'react';
import classNames from 'classnames';

export default class Track extends Component {
  render() {
    const {track, searchYoutubeAndPlay, dispatch} = this.props;
    var songClass = classNames('song');
    return (
    <div key={track.id} className={songClass}>
        <span className={classNames('song__play')}>
            <i class="icon-play-icon"></i>
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

//style={{borderTop : '1px solid #282832',padding:'8px 15px',color : '#FFFFFF'}}
//<button onClick={()=> dispatch(searchYoutubeAndPlay(track))}>PLAY</button>