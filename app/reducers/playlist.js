import Constants from '../lib/Constants';
import _ from 'lodash';

const { PLAYLIST } = Constants;

const playlist = (state = {}, action) => {
  switch (action.type) {
  	case PLAYLIST.SET_INITIAL_PLAYLIST_DATA:{
  		return Object.assign({},state,{
        mostPopular:action.data.popular,
        heavyRotation:action.data.billboard,
        newReleases:action.data.newReleases
      });;
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