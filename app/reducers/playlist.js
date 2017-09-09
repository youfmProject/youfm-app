import Constants from '../lib/Constants';
import _ from 'lodash';

const { PLAYLIST } = Constants;

//Playlist for testing purposes, please don't delete

const initialState ={
  mostPopular:[],
  heavyRotation:[],
  newReleases:[],
  history:[],
  favourite:[],
  userList: {}
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
    case PLAYLIST.ADD_TO_HISTORY :{
      let history = Array.from(state.history);
      _.isArray(action.track) ? history = history.concat(action.track) : history.push(action.track);
      return Object.assign({},state,{history})
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