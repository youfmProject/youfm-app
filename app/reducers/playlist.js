import Constants from '../lib/Constants';
import _ from 'lodash';

const { PLAYLIST } = Constants;

//Playlist for testing purposes, please don't delete
const initialState ={
  mostPopular:[],
  heavyRotation:[],
  newReleases:[],
  favourite:[],
  history:[],
  userPlaylist:{
    play1:[{
      artist:"↵Luis Fonsi & Daddy Yankee Featuring Justin Bieber↵",
      image:"http://charts-static.billboard.com/img/2017/01/luis-fonsi-rkx-despacito-4j3.jpg",
      name:"Despacito",
      rank:"1"
    }],
    play2:[{
      albumType:"album",
      artist:"A$AP Ferg",
      image:"https://i.scdn.co/image/e0d2d77ca43c5ea0f89b251655b4cf80033e4cf2",
      name:"Still Striving",
      songId:"0tQ7Iu6EicQTPyhYRNWjaT",
    }]
  }
}
const playlist = (state = initialState, action) => {
  switch (action.type) {
  	case PLAYLIST.SET_INITIAL_PLAYLIST_DATA:{
  		return Object.assign({},state,{
        mostPopular:action.data.popular,
        heavyRotation:action.data.billboard,
        newReleases:action.data.newReleases
      });
  	}
    case PLAYLIST.TOGGLE_FAVOURITE:{
      let searchTrack = {'name': action.track.name,'artist':action.track.artist};
      let newState = _.cloneDeep(state);
      if(action.opt){
        Object.keys(newState).forEach(function(key) {
          _.assign(_.find(newState[key],searchTrack),{favourite:false});
        });
        newState.favourite.splice(_.findIndex(newState.favourite,searchTrack),1);
      }
      else{
        Object.keys(newState).forEach(function(key) {
          _.assign(_.find(newState[key],searchTrack),{favourite:true});
        });
        newState.favourite.push(action.track);
      }
      return Object.assign({},newState);
    }
    case PLAYLIST.SET_PLAYLIST_DATA:{
      let newState = _.cloneDeep(state);
      newState[action.name] = action.tracks;
      return Object.assign({},newState);
    }
    default:
      return state
  }
}

export default playlist;