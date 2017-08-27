import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import classNames from 'classnames';
import {get} from 'lodash';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import '../less/rc-slider.less';

export default class Player extends Component {

	constructor() {
        super();
        this.state = {
            played: 0,
            shuffle:false,
            repeat:'none'
        }
    }

  	render() {
	  	const {player, dispatch, playPrevious, playNext, playNextVideo, toggleShuffle, toggleRepeat, nowPlaying, togglePlay} = this.props;
	  	let playPauseClass = player.playing ? "action--pause" : "action--play";
	    return (
	    	<div>
				{ player.id ? <div style={{bottom:'150px',position:'fixed', left:'0px', height:'50px'}}>
					<ReactPlayer url={`https://www.youtube.com/watch?v=${player.id}`} 
						ref={player => { this.player = player }}
						playing={player.playing} 
						youtubeConfig={{modestbranding:1}}
						onPlay={()=>{dispatch(togglePlay('react-player'))}}
						onPause={()=>{dispatch(togglePlay('react-player'))}}
						height={136}
						width={200}
						onError={()=>dispatch(playNextVideo())}
						onEnded={()=>dispatch(playNext())}
						onProgress={(progress)=>{this.setState({played:progress.played * 10000})}}/>
				</div> : null}
				<div className={classNames("controls--main")} style={{left:'0'}}>
					<div className={classNames("song-progress")}>
						<Slider style={{ width: '100%'}} 
							onChange={(value)=>{ 
								player.id ? this.player.seekTo(parseFloat(value/10000)) : null
							}}
							min={0}
							max={10000}
							value={this.state.played || 0} 
						/>
					</div>
					<div style={{float:'left', width:'200px', color:'white', marginLeft:'5px', position:'fixed',whiteSpace:'nowrap'}}>
					<p>{get(nowPlaying.queue[nowPlaying.playIndex],'name','')}</p>
					<p>{get(nowPlaying.queue[nowPlaying.playIndex],'artist','')}</p>
					</div>
					<div className={classNames("actions")}>
						<button className={classNames("action--shuffle",{"action--shuffle--active":nowPlaying.shuffle})} onClick={()=>dispatch(toggleShuffle())}></button>
						<button className={classNames("action--previous")} onClick={()=>dispatch(playPrevious())}></button>
						<button className={classNames(playPauseClass)} onClick={()=>dispatch(togglePlay('player'))}></button>
						<button className={classNames("action--next")} onClick={()=>dispatch(playNext())}></button>
						<button className={classNames("action--repeat")} onClick={()=>dispatch(toggleRepeat())}></button>
					</div>
				</div>
			</div>
		);
	}
}