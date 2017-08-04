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

export function setIndex(index){
	return {
		type:NOW_PLAYING.SET_INDEX,
		index
	}
}

export function resetQueue(tracks){
	return{
		type:NOW_PLAYING.RESET_QUEUE,
		tracks
	}
}

export function callYoutube(track,callback){
	let searchTerm = track.name ? track.name+' '+track.artist : track;
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

export function playPrevious(){
	return(dispatch,getState)=>{
		const state = getState();
		let index =((state.nowPlaying.playIndex - 1) < 0) ? 0 : state.nowPlaying.playIndex - 1;
		callYoutubeAndPlay(state,dispatch,index);
	}
}

export function playNext(){
	return(dispatch,getState)=>{
		const state = getState();
		let index = ((state.nowPlaying.playIndex + 1) >= state.nowPlaying.queue.length)? state.nowPlaying.queue.length - 1 : state.nowPlaying.playIndex + 1;
		callYoutubeAndPlay(state,dispatch,index);
	}
}

let callYoutubeAndPlay=(state,dispatch,index)=>{
	let track = state.nowPlaying.queue[index];
	console.log(track);
	callYoutube(track,(data)=>{
		let playlistName = state.routing.locationBeforeTransitions.pathname.split('/')[1];
		let route = (playlistName === 'search') ? `/${playlistName}/${state.search.searchKey}/${data[0].id}` : `/${playlistName}/${data[0].id}`;
		dispatch(
			batchActions([
			RoutingActions.locationChange(route),
			addToYTQueue(data),
			setIndex(index)
		]));
	});
}
/* TODO, combine instantPlay to call callYoutubeAndPlay */
export function instantPlay(track,playlistName=false){
	return(dispatch,getState)=>{
		const state = getState();
		let index = _.findIndex(state.playlist[playlistName],{name:track.name,artist:track.artist});
		console.log(index);
		callYoutube(track,(data)=>{
			let route = (playlistName === 'search') ? `/${playlistName}/${state.search.searchKey}/${data[0].id}` : `/${playlistName}/${data[0].id}`;
			console.log(route);
			dispatch(
				batchActions([
				RoutingActions.locationChange(route),
				resetQueue(state.playlist[playlistName]),
				addToYTQueue(data),
				setIndex(index)
			]));
		});
	}
}
