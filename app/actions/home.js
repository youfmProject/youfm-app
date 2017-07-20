import axios from 'axios';
import Constants from '../lib/Constants';
import { batchActions } from 'redux-batched-actions'

const { HOME, PLAYLIST} = Constants;

let spotifySearchComplete=(tracks)=>{
	return {
		type:HOME.SPOTIFY_SEARCH_COMPLETE,
		tracks
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

export function getHomeData(){
	return(dispatch,getState)=>{
		axios({
		  method:'get',
		  url:'/api/v1/albums'
		}).then(res=>{
			dispatch(batchActions([
				setHomeData(res.data),
				setPlaylistData(res.data)
			]));
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

export function getSpotifySearch(){
	return(dispatch,getState)=>{
		axios({
		  method:'get',
		  url:'/api/v1/spotify'
		}).then(res=>{
			dispatch(spotifySearchComplete(res.data.tracks.items));
		});
	}
}