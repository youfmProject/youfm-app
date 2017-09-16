import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import classNames from 'classnames';
import {get} from 'lodash';
import { Link } from 'react-router';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import { batchActions } from 'redux-batched-actions';
import '../less/rc-slider.less';

export default class Player extends Component {

	constructor() {
        super();
        this.state = {
            played: 0,
            shuffle:false,
            repeat:'none',
            start:'0:00',
            end:'0:00',
            volume:0
        }
    }

    formatTime(seconds){
		let x = (seconds-(seconds%=60))/60+(9<seconds?':':':0')+seconds;
		return x;
    }

  	render() {
	  	const {player, dispatch, setVolume, playPrevious, playNext, playNextVideo, toggleShuffle, setLocalStore, toggleRepeat, nowPlaying, togglePlay, playerScreen, repeatType, toggleModal, volume} = this.props;

	  	let playPauseClass = player.playing ? "action--pause" : "action--play";
		const query = this.props.params.play ? this.props.params.play : '';
	    return (
	    		<div>
				{ player.id ? <div className="videoplayer">
					<ReactPlayer url={`https://www.youtube.com/watch?v=${player.id}`} 
						ref={player => { this.player = player }}
						playing={player.playing} 
						youtubeConfig={{modestbranding:1}}
						onDuration={(Duration)=>{let et= this.formatTime(Math.ceil(Duration)).toString(); this.setState({end:et});}}
						onError={()=>dispatch(playNextVideo())}
						onEnded={()=>dispatch(playNext())}
						volume={volume}
						onProgress={(progress)=>{
							let start = this.formatTime(Math.floor(progress.playedSeconds));
	    					this.setState({played:progress.played * 10000,start:start});
	    				}}/>
						<div className="videooverlay">
							<button className={classNames(playPauseClass)} onClick={()=>dispatch(togglePlay())}></button>
							<button onClick={()=>dispatch(playerScreen('large'))}>Lg</button>
							<button onClick={()=>dispatch(playerScreen('full'))}>FL</button>
							<button onClick={()=>{this.player.seekTo(0);}}>RT</button>
						</div>
				</div> : null}
				<div className={classNames("controls--main")} style={{left:'0'}}>
					<div className="song-end">
						{this.state.end}
					</div>
					<div className="song-start">
						{this.state.start}
					</div>
					<div className="controls--volume">
						<Slider style={{ width: '100px', position:'absolute', marginTop:'50px', marginLeft:'15%'}} 
							onChange={(value)=>{
								let normalizedVolume = parseFloat(value/100);
								setLocalStore({volume:normalizedVolume});
								dispatch(setVolume(normalizedVolume));
							}}
							min={0}
							max={100}
							value = { volume * 100}
						/>
					</div>
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
					<div className="songinfo">
						<p className="song-info">{get(nowPlaying.queue[nowPlaying.playIndex],'name','')}</p>
						<p className="artist-info">{get(nowPlaying.queue[nowPlaying.playIndex],'artist','')}</p>
					</div>
					<a onClick={()=> dispatch(toggleModal('AboutUs', 'About Us'))}>About Us </a>
					<div className={classNames("actions")}>
						<button className={classNames("action--shuffle",{"action--shuffle--active":nowPlaying.shuffle})} onClick={()=>dispatch(toggleShuffle())}></button>
						<button className={classNames("action--previous")} onClick={()=>dispatch(playPrevious())}></button>
						<button className={classNames(playPauseClass)} onClick={()=>dispatch(togglePlay())}></button>
						<button className={classNames("action--next")} onClick={()=>dispatch(playNext())}></button>
						<button className={classNames("action--repeat")} onClick={()=>dispatch(toggleRepeat())}></button>
					</div>
					
				</div>
			</div>
		);
	}
}