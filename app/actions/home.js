import axios from 'axios';
import Constants from '../lib/Constants';
import { batchActions } from 'redux-batched-actions'
import * as PlayerActions from './player';

const { HOME, PLAYLIST, SEARCH} = Constants;

let spotifySearchComplete=(tracks)=>{
	return {
		type:SEARCH.SPOTIFY_SEARCH_COMPLETE,
		tracks: tracks
	}
}

let setHomeData=(data)=>{
	return {
		type:HOME.SET_HOME_DATA,
		data
	}
}
let setPlaylistData=(data)=>{
	return {
		type:PLAYLIST.SET_PLAYLIST_DATA,
		data
	}
}

export const getHomeData = () => (dispatch, getState) =>{
	return axios({
		method:'get',
		url:'/api/v1/albums'
	}).then(res=>{
		dispatch(batchActions([
			setHomeData(res.data),
			setPlaylistData(res.data)
		]));
	});
}

/* for Demo purposes only, this data should be dumped somewhere and player should pick it up from there */
export function searchYoutubeAndPlay(track){
		return(dispatch,getState)=>{
		axios({
		  method:'get',
		  url:'/api/v1/youtube?search='+track.name+' '+track.artist
		}).then(res=>{
			dispatch(PlayerActions.playerPlay(res.data[0].id));
		});
	}
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
		axios({
		  method:'get',
		  url:'/api/v1/spotify?search='+searchKey
		}).then(res=>{
			dispatch(batchActions([
      			spotifySearchComplete(res.data),
      			searchKeyword('')
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