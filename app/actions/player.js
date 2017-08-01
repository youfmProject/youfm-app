import axios from 'axios';
import Constants from '../lib/Constants';
import { batchActions } from 'redux-batched-actions'

const { PLAYER } = Constants;

export function togglePlay(){
	return {
		type:PLAYER.TOGGLE_PLAY
	}
}

export function playerPlay(id){
	return {
		type:PLAYER.START_PLAY,
		id
	}
}

// export function setPlayerPlayId(){
// 	return(dispatch,getState)=>{
// 		const state = getState();
// 		let playIndex = state.nowPlaying.playIndex;
// 		if(playIndex !== 'notSet'){
// 			let playerID = state.nowPlaying.queue[playIndex].id
// 			dispatch(playerPlay(playerID));
// 		}
// 	}
// }
