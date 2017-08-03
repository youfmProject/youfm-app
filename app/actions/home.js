import axios from 'axios';
import Constants from '../lib/Constants';
import { batchActions } from 'redux-batched-actions';
import * as PlayerActions from './player';
import * as NowPlayingActions from './nowPlaying';
import {browserHistory} from 'react-router';
import * as RoutingActions from './routing';

const { HOME, PLAYLIST, SEARCH, NOW_PLAYING} = Constants;

let spotifySearchComplete=(searchKey,tracks)=>{
	return {
		type:SEARCH.SPOTIFY_SEARCH_COMPLETE,
		tracks,
		searchKey
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

let setPlaylist=(name,data)=>{
	return {
		type:PLAYLIST.SET_PLAYLIST_DATA,
		data,
		name
	}
}

export const getHomeData = () => (dispatch, getState) =>{
	return axios({
		method:'get',
		url:'/api/v1/albums'
	}).then(res=>{
		dispatch(batchActions([
			setHomeData(res.data),
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
				RoutingActions.locationChange(`/search/${searchKey}/${state.player.id}`),
      			spotifySearchComplete(searchKey,res.data),
      			setPlaylist('search',res.data)
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