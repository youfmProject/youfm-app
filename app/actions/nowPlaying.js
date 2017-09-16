import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import Constants from '../lib/Constants';
import * as PlayerActions from './player';
import * as RoutingActions from './routing';
import * as HomeActions from './home'

const { NOW_PLAYING, PLAYER, PLAYLIST } = Constants;

export function addToVideoQueue(ytTracks){
	return {
		type:NOW_PLAYING.ADD_TO_VIDEO_QUEUE,
		ytTracks
	}
}

export function addToQueue(tracks){
	return{
		type:NOW_PLAYING.ADD_TO_QUEUE,
		tracks
	}
}

export function appendtoQueue(track){
	return{
		type:NOW_PLAYING.APPEND_TO_QUEUE,
		track
	}
}

export function toggleShuffle(){
	return{
		type:NOW_PLAYING.TOGGLE_SHUFFLE
	}
}

export function toggleRepeat(){
	return{
		type:NOW_PLAYING.TOGGLE_REPEAT
	}
}

export function setIndex(index){
	return {
		type:NOW_PLAYING.SET_INDEX,
		index
	}
}

export function setVideoIndex(index){
	return {
		type:NOW_PLAYING.SET_VIDEO_INDEX,
		index
	}
}

export function resetQueue(tracks){
	return{
		type:NOW_PLAYING.RESET_QUEUE,
		tracks
	}
}
/* MODIFY THIS FUNCTION FOR MULTI-SELECT*/
// export function selectTrack(track){
// 	return {
// 		type:PLAYLIST.SELECT_TRACK,
// 		track
// 	}
// }

export function selectTrack(track){
	return {
		type:PLAYLIST.SELECT_TRACK,
		track
	}
}

export function showTray(trayIndex){
	return {
		type:PLAYLIST.SELECT_TRAY_INDEX,
		trayIndex
	}
}

export function addToHistory(track, addToLocalStore = true){
	if(addToLocalStore){
		let localHistory = JSON.parse(localStorage.getItem('liveJam')).history;
		localHistory.push(track);
		HomeActions.setLocalStore({history:localHistory})
	}
	return{
		type:PLAYLIST.ADD_TO_HISTORY,
		track
	}
}

export function callYoutube(track,callback){
	if(track){
		let searchTerm = track.id ? track.id : (track.name) ? track.name+' '+track.artist : track;
		axios({
		  method:'get',
		  url:'/api/v1/youtube?search='+searchTerm
		}).then(res=>{
			callback(res.data);
		})
	}
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
					addToVideoQueue(data),
					incrementIndex()
				])
			);
		});
	}
}

export function playNextVideo(){
	return(dispatch,getState)=>{
		const state = getState();
		let videoIndex = state.nowPlaying.videoIndex + 1;
		if(videoIndex < state.nowPlaying.videoQueue.length){
			let route = getRoute(state)
			dispatch(batchActions([setVideoIndex(videoIndex), RoutingActions.locationChange(route)]));
		}	
	}
}

export function playPrevious(){
	return(dispatch,getState)=>{
		const state = getState();
		dispatch(PlayerActions.resetPlayer());
		let index =((state.nowPlaying.playIndex - 1) < 0) ? 0 : state.nowPlaying.playIndex - 1;
		callYoutubeAndPlay(state,dispatch,index);
	}
}

export function playNext(){
	return(dispatch,getState)=>{
		const state = getState();
		let index;
		dispatch(PlayerActions.resetPlayer());
		if(state.nowPlaying.shuffle){
			index = Math.floor(Math.random(state.nowPlaying.queue.length) * 10);
 		}
		else{
			let repeatType = state.nowPlaying.repeatType;
			if(repeatType === 'repeat'){
				//dispatch(PlayerActions.resetPlayer());
				index = state.nowPlaying.playIndex;
			}
			else if(((state.nowPlaying.playIndex + 1) === state.nowPlaying.queue.length) && repeatType === 'all'){
				//dispatch(PlayerActions.resetPlayer());
				index = 0;
			}
			else{
				index = ((state.nowPlaying.playIndex + 1) >= state.nowPlaying.queue.length)? state.nowPlaying.queue.length - 1 : state.nowPlaying.playIndex + 1;
			}
		}
		callYoutubeAndPlay(state,dispatch,index);
	}
}

let getRoute=(state,videoData = false, playlistName = false)=>{
	let pN = playlistName ? playlistName : state.routing.locationBeforeTransitions.pathname.split('/')[1],
		lN = state.routing.locationBeforeTransitions.pathname.split('/')[2],
		sK = state.search.searchKey,
		vQ = state.nowPlaying.videoQueue,
		vI = state.nowPlaying.videoIndex,
		sR = state.reddit.subReddit,
		route;
	if(videoData){
		switch(pN) {
			case 'search': {
				route = `/${pN}/${sK}/${videoData[0].id}`;
				break;
			}
			case 'r': {
				route = `/${pN}/${sR}/${videoData[0].id}`;
				break;
			}
			case 'userList': {
				route = `/${pN}/${lN}/${videoData[0].id}`;
				break;
			}
			default: {
				route = `/${pN}/${videoData[0].id}`;
				break;
			}
		}
	}
	else{
		switch(pN) {
			case 'search': {
				route = `/${pN}/${sK}/${state.nowPlaying.vQ[vI].id}`;
				break;
			}
			case 'r': {
				route = `/${pN}/${sR}/${state.nowPlaying.vQ[vI].id}`;
				break;
			}
			default: {
				route = `/${pN}/${vQ[vI].id}`;
				break;
			}
		}
	}
	return route;
}

let callYoutubeAndPlay=(state,dispatch,index)=>{
	let track = state.nowPlaying.queue[index];
	callYoutube(track,(data)=>{
		let route = getRoute(state,data);
		dispatch(
			batchActions([
			RoutingActions.locationChange(route),
			addToVideoQueue(data),
			setIndex(index),
			addToHistory(track)
		]));
		// send track to remote history
		let userStatus = JSON.parse(localStorage.getItem('liveJam')).userStatus;
		if(userStatus.status){
			return dispatch(HomeActions.postPlaylist(userID,['history'],track));
		}
	});
}

/* TODO, combine instantPlay to call callYoutubeAndPlay */
export function instantPlay(track, name = 'heavyRotation'){
	return(dispatch,getState)=>{
		const state = getState();
		let playlistName = state.routing.locationBeforeTransitions.pathname.split('/')[1];
		let listName = state.routing.locationBeforeTransitions.pathname.split('/')[2];
		if(playlistName === 'home'){
			playlistName = name;
		}
		dispatch(PlayerActions.resetPlayer());
		let index = playlistName === 'userList' ? _.findIndex(state.playlist[playlistName][listName],{name:track.name,artist:track.artist}) :_.findIndex(state.playlist[playlistName],{name:track.name,artist:track.artist});
		callYoutube(track,(data)=>{
			// will reset if existing track is playing
			// TODO : Have to catch if different Id of video is being player	
			if(state.player.id === data[0].id){
				dispatch(PlayerActions.resetPlayer());
			}
			let route = getRoute(state, data, playlistName);
			let actionsArray = [];
			actionsArray= [RoutingActions.locationChange(route),addToVideoQueue(data),setIndex(index),addToHistory(track)];
			(playlistName !== 'nowPlaying') ? actionsArray.push(resetQueue(state.playlist[playlistName])) : null
			dispatch(batchActions(actionsArray));
			let userStatus = JSON.parse(localStorage.getItem('liveJam')).userStatus;
			if(userStatus.status){
				return dispatch(HomeActions.postPlaylist(userID,['history'],track));
			}
		});
	}
}
