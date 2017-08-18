import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import classNames from 'classnames';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import '../less/rc-slider.less';

// This value is to track the play/pause events from the controls
let origintrack = '';

export default class Player extends Component {

	constructor() {
        super();
        this.state = {
            played: 0,
            shuffle:false,
            repeat:'none'
        }
    }

    componentDidMount(){
    	//start player if id present
    	this.handleTogglePlay('player');
  	}

    handleTogglePlay(origin){
    	const {dispatch,togglePlay} = this.props;
    	if(origintrack === 'player'){
    		origintrack = origin;
    	}
    	else{
    		origintrack = origin;
    		dispatch(togglePlay());
    	}
    }

  	render() {
	  	const {player, dispatch, playPrevious, playNext, playNextVideo, toggleShuffle, toggleRepeat, nowPlaying} = this.props;
	  	let playPauseClass = player.playing ? "action--play" : "action--pause";
	    return (
	    	<div>
				{ player.id ? <div style={{bottom:'150px',position:'fixed', left:'0px', height:'50px'}} onClick={()=>{console.log('clicked')}}>
					<ReactPlayer url={`https://www.youtube.com/watch?v=${player.id}`} 
						ref={player => { this.player = player }}
						playing={player.playing} 
						youtubeConfig={{modestbranding:1}}
						onPlay={()=>{this.handleTogglePlay('react-player')}}
						onPause={()=>{this.handleTogglePlay('react-player')}}
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
								this.player.seekTo(parseFloat(value/10000));
							}}
							min={0}
							max={10000}
							value={this.state.played || 0} 
						/>
					</div>
					<div className={classNames("actions")}>
						<button className={classNames("action--shuffle",{"action--shuffle--active":nowPlaying.shuffle})} onClick={()=>dispatch(toggleShuffle())}></button>
						<button className={classNames("action--previous")} onClick={()=>dispatch(playPrevious())}></button>
						<button className={classNames(playPauseClass)} onClick={()=>{this.handleTogglePlay('player')
					}}></button>
						<button className={classNames("action--next")} onClick={()=>dispatch(playNext())}></button>
						<button className={classNames("action--repeat")} onClick={()=>dispatch(toggleRepeat())}></button>
					</div>
				</div>
			</div>
		);
	}
}