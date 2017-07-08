import axios from 'axios';

export function getYoutubeSearch(){
	axios({
	  method:'get',
	  url:'/api/v1/youtube'
	}).then(res=>{
		console.log(res)
	});
	return {
		type:'YT'
	}
}

export function getSpotifySearch(){
	axios({
	  method:'get',
	  url:'/api/v1/albums'
	}).then(res=>{
		console.log(res)
	});
	return {
		type:'ST'
	}
}