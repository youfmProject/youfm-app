import Constants from '../lib/Constants';
import _ from 'lodash';

const { PLAYLIST } = Constants;

const playlist = (state = {}, action) => {
  switch (action.type) {
  	case PLAYLIST.SET_PLAYLIST_DATA:{
  		return Object.assign({},state,{
        mostPopular:action.data.popular,
        heavyRotation:action.data.billboard,
        newReleases:action.data.newReleases
      });;
  	}
    default:
      return state
  }
}

export default playlist;