import Constants from '../lib/Constants';

const { HOME } = Constants;

const home = (state = {user:[],albums:[],images:[]}, action) => {
  switch (action.type) {
  	case HOME.SET_HOME_DATA:{
  		return Object.assign({},state,{albums:action.data.albums,images:action.data.images})
  	}
    case HOME.SET_FEEDBACK: {
      return Object.assign({}, state, {[action.field]: action.data});
    }
    default:
      return state
  }
}

export default home;