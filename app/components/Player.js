import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import classNames from 'classNames';

export default class Player extends Component {

	clickedPlay(){
		const {dispatch,togglePlay} = this.props;
		dispatch(togglePlay());
	}
// ADD PLAYER CLASS
  render() {
  	const {player} = this.props;
    return (
	<div>
		<div style={{bottom:'380px',position:'absolute',height:'50px'}}>
			{player.id ? 
				<ReactPlayer url={`https://www.youtube.com/watch?v=${player.id}`} 
					playing={player.playing} 
				/> : null }
		</div>
		<div className={classNames("controls--main")}>

	<div className={classNames("song-progress")}></div>

	<div class="actions">
		<button className={classNames("action--shuffle")}></button>
		<button className={classNames("action--previous")}></button>
		<button className={classNames("action--play")} onClick={()=>this.clickedPlay()}></button>
		<button className={classNames("action--next")}></button>
		<button className={classNames("action--repeat")}></button>
	</div>

</div>
		{/*<div style={{bottom:'25px',position:'absolute',height:'25px'}}>Seek</div>
		<div style={{bottom:'20px',position:'absolute',height:'20px'}}>
			<button>Shuffle</button>
			<button>Prev</button>
			<button onClick={()=>this.clickedPlay()}>Play</button>
			<button>Next</button>
			<button>Repeat</button>
		</div>*/}
	</div>
    );
  }
}