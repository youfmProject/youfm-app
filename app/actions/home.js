import axios from 'axios';

export function getYoutubeSearch(){
	axios({
	  method:'get',
	  url:'http://localhost:3000/api/v1/youtube'
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
	  url:'http://localhost:3000/api/v1/spotify'
	}).then(res=>{
		console.log(res)
	});
	return {
		type:'ST'
	}
}