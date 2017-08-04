import Constants from '../lib/Constants';

const { NOW_PLAYING } = Constants;

const initialState = {
	queue:[],
	ytQueue:[],
	playIndex:'notSet',
  ytIndex:0,
}

const nowPlaying = (state = initialState, action) => {
  switch (action.type) {
  	case NOW_PLAYING.ADD_TO_YT_QUEUE:{
  		return Object.assign({},state,{ytQueue:action.ytTracks})
  	}
  	case NOW_PLAYING.ADD_TO_QUEUE :{
  		let queue = Array.from(state.queue);
  		queue.push(action.tracks);
  		return Object.assign({},state,{queue})
  	}
  	case NOW_PLAYING.INCREMENT_INDEX: {
  		let index = state.playIndex === 'notSet' ? 0 : state.playIndex+1;
  		return Object.assign({},state,{playIndex:index})
  	}
  	case NOW_PLAYING.RESET_QUEUE:{
  		let queue = Array.from(action.tracks);
  		return Object.assign({},state,{queue})
  	}
    case NOW_PLAYING.SET_INDEX:{
      return Object.assign({},state,{playIndex:action.index})
    }
    default:
      return state
  }
}

export default nowPlaying;