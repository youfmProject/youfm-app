import React, { Component } from 'react';


export default class Track extends Component {
  render() {
    const {track, searchYoutubeAndPlay, dispatch} = this.props;
    return (
    <div key={track.id} style={{borderTop : '1px solid #282832',padding:'8px 15px',color : '#FFFFFF'}}>
        <span> Fav </span>
        <span style={{marginLeft:'25px'}}>#</span>
        <span style={{marginLeft:'25px'}}><button onClick={()=> dispatch(searchYoutubeAndPlay(track))}>PLAY</button></span>
        <span style={{marginLeft:'25px'}}>{track.name}</span>
        <span style={{marginLeft:'25px'}}>{track.artist}</span>
        <span style={{marginLeft:'25px'}}>...</span>
		</div>
    );
  }
}