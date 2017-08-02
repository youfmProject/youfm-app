import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import Constants from '../lib/Constants';
import * as PlayerActions from './player';
import * as RoutingActions from './routing';

const { NOW_PLAYING } = Constants;

export function addToYTQueue(ytTracks){
	return {
		type:NOW_PLAYING.ADD_TO_YT_QUEUE,
		ytTracks
	}
}

export function addToQueue(tracks){
	return{
		type:NOW_PLAYING.ADD_TO_QUEUE,
		tracks
	}
}

export function resetQueue(tracks){
	return{
		type:NOW_PLAYING.RESET_QUEUE,
		tracks
	}
}

export function callYoutube(searchTerm,callback){
	axios({
	  method:'get',
	  url:'/api/v1/youtube?search='+searchTerm
	}).then(res=>{
		callback(res.data);
	})
}

let incrementIndex=()=>{
	return{
		type:NOW_PLAYING.INCREMENT_INDEX,
	}
}

export function bootPlayer(track,playlistName=false){
	return(dispatch,getState)=>{
		callYoutube(track,(data)=>{
			dispatch(
				batchActions([
					addToQueue(data[0]),
					addToYTQueue(data),
					incrementIndex()
				])
			);
		});
	}
}

export function instantPlay(track,playlistName=false){
	return(dispatch,getState)=>{
		const state = getState();
		callYoutube(track,(data)=>{
			dispatch(
				batchActions([
					RoutingActions.locationChange(`/${playlistName}/${data[0].id}`),
					resetQueue(state.playlist[playlistName]),
					addToYTQueue(data)//,
					//setIndex()
				])
			);
		});
	}
}
