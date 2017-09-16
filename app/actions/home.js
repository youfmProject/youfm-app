import axios from 'axios';
import Constants from '../lib/Constants';
import { batchActions } from 'redux-batched-actions';
import * as PlayerActions from './player';
import * as NowPlayingActions from './nowPlaying';
import {browserHistory} from 'react-router';
import * as RoutingActions from './routing';
import * as AppActions from './app';

const { HOME, PLAYLIST, SEARCH, NOW_PLAYING, REDDIT } = Constants;

let spotifySearchComplete=(searchKey, tracks, error)=>{
	return {
		type:SEARCH.SPOTIFY_SEARCH_COMPLETE,
		tracks,
		searchKey, 
		error
	}
}

let redditSearchSuccess=(subReddit, tracks, error)=> {
	return {
		type:REDDIT.SEARCH_COMPLETE,
		tracks,
		subReddit,
		error
	}
}

let setHomeData=(data)=>{
	return {
		type:HOME.SET_HOME_DATA,
		data
	}
}
let setInitialPlaylist=(data)=>{
	return {
		type:PLAYLIST.SET_INITIAL_PLAYLIST_DATA,
		data
	}
}

export function setPlaylist(name,tracks){
	return {
		type:PLAYLIST.SET_PLAYLIST_DATA,
		name,
		tracks
	}
};

export function setUserPlaylist(name,tracks){
	return {
		type:PLAYLIST.SET_USER_PLAYLIST_DATA,
		name,
		tracks
	}
};

export function setLocalStore(lsObject){
	let ls = localStorage.getItem('liveJam');
	if(ls){
		ls= JSON.parse(ls);
		localStorage.setItem('liveJam',JSON.stringify(_.assign(ls,lsObject)));
	}
	else{
      localStorage.setItem('liveJam',JSON.stringify(lsObject));
	}
}

let toggleFavouriteAction=(track,opt)=>{
	return {
		type:PLAYLIST.TOGGLE_FAVOURITE,
		track,
		opt
	}
}

export function toggleFavourite(track,opt){
	return(dispatch,getState)=>{

		let state = getState();
		let payload = {
			playlists: {
				favourites: [track],	
			},
			userId: state.user.userId
		};
		axios({
		  method:'post',
		  url:'/api/v1/playlist',
		  data: payload
		}).then(res=>{
			dispatch(toggleFavouriteAction(track, opt));
		});
	}
}



export function resetPlaylistOrder(name,data){
	let tracks = [];
	data.map((item)=>{
		tracks.push(item.content.props.track);
	});
	if(name === 'nowPlaying'){
		return {
			type:NOW_PLAYING.RESET_QUEUE,
			tracks
		}
	}
	else{
		return {
			type:PLAYLIST.SET_PLAYLIST_DATA,
			tracks,
			name
		}
	}
}

export const getHomeData = () => (dispatch, getState) =>{
	return axios({
		method:'get',
		url:'/api/v1/albums'
	}).then(res=>{
		dispatch(batchActions([
			setInitialPlaylist(res.data)
		]));
	});
}

export function getYoutubeSearch(){
	return(dispatch,getState)=>{
		axios({
		  method:'get',
		  url:'/api/v1/youtube'
		}).then(res=>{
			dispatch(spotifySearchComplete(res.data.tracks.items));
		});
	}
}

export function getSpotifySearch(searchKey){
	return(dispatch,getState)=>{
		let state = getState();
		axios({
		  method:'get',
		  url:'/api/v1/spotify?search='+searchKey
		}).then(res=>{
			dispatch(batchActions([
				RoutingActions.locationChange(`/search/track-${searchKey}/${state.player.id}`),
      			spotifySearchComplete('track-'+searchKey, res.data, false),
      			setPlaylist('search',res.data)
    			])
    		);
		})
		.catch(err => {
			dispatch(batchActions([
				spotifySearchComplete(searchKey, [], true),
				RoutingActions.locationChange(`/search/track-${searchKey}/${state.player.id}`)
				])
			);
		});
	}
}

export function searchArtist(key, id, type){
	return(dispatch,getState)=>{
		let query = id ? id : key;
		let state = getState();
		axios({
		  method:'get',
		  url:'/api/v1/spotify?'+type+'='+query+'&id='+id
		}).then(res=>{
			dispatch(batchActions([
				RoutingActions.locationChange(`/search/${type}-${id}/${state.player.id}`),
      			spotifySearchComplete(`${type}-${key}`, res.data, false),
      			setPlaylist('search', res.data)
    			])
    		);
		})
		.catch(err => {
			dispatch(batchActions([
				spotifySearchComplete(`${type}-${key}`, [], true),
				RoutingActions.locationChange(`/search/${type}-${key}/${state.player.id}`)
				])
			);
		});
	}
}

export function searchKeyword(data){
	return {
		type: SEARCH.EDIT_SEARCH_KEY,
		searchKey: data
	};
}

export function getRedditList(subReddit){
	return(dispatch, getState)=> {
		let state = getState();
		axios({
		  method:'get',
		  url:'/api/v1/reddit?subReddit='+subReddit
		}).then(res=> {
			dispatch(batchActions([
				RoutingActions.locationChange(`/r/${subReddit}/${state.player.id}`),
      			redditSearchSuccess(subReddit, res.data, false),
      			setPlaylist('r', res.data)
    			])
			)
		}).catch(err => {
			redditSearchSuccess(subReddit, [], true);
		});
	}
}

export function editFeedback(field, data){
	return {
		type: HOME.SET_FEEDBACK,
		field,
		data
	}
}

export function submitFeedback(){
	return(dispatch, getState) => {
		let state = getState();
		let data = {
			email: state.home.email,
			feedback: state.home.feedback
		}
		axios({
			method: 'post',
		  	url:'/api/v1/feedback',
          	data: data
		}).then(res => {
			dispatch(AppActions.toggleModal('',''));
		});
	}
}

// DUMMY ACTION TO CALL AFTER POST PLAYLIST
export function postPlaylistComplete(){
	return {
		type: PLAYLIST.POST_PLAYLIST_COMPLETE
	};
}

export function postPlaylist(userID, name, tracks){
	console.log('########### POST PLAYLIST ############');
	console.log(userID, name, tracks)
	return(dispatch, getState)=> {
		let payload = {
			userId:userID,
			playlists: {}
		}
		name.map((item)=>{
			_.assign(payload.playlists,{[name]:[tracks]});
		});
		axios({
		  method:'post',
		  url:'/api/v1/playlist',
		  body:JSON.stringify(payload)
		}).then(res=> {
			dispatch(postPlaylistComplete());
		}).catch(err => {
			dispatch(postPlaylistComplete());

		});
	}
}