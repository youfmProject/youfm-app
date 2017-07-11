import axios from 'axios';
import Constants from '../lib/Constants';

const { HOME} = Constants;

let spotifySearchComplete=(tracks)=>{
	console.log('reached here');
	return {
		type:HOME.SPOTIFY_SEARCH_COMPLETE,
		tracks
	}
}

export function getYoutubeSearch(){
	return(dispatch,getState)=>{
		axios({
		  method:'get',
		  url:'/api/v1/youtube'
		}).then(res=>{
			console.log(res);
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
			console.log(res);
			dispatch(spotifySearchComplete(res.data.tracks.items));
		});
	}
}