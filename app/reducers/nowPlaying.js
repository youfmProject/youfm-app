import Constants from '../lib/Constants';

const { NOW_PLAYING } = Constants;

const initialState = {
	queue:[],
	videoQueue:[],
	playIndex:'notSet',
  videoIndex:0,
  shuffle:false,
  repeatType:'none'
}

const repeatMap = ['none','repeat', 'all'];

const nowPlaying = (state = initialState, action) => {
  switch (action.type) {
  	case NOW_PLAYING.ADD_TO_VIDEO_QUEUE:{
  		return Object.assign({},state,{videoQueue:action.ytTracks})
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
    case NOW_PLAYING.SET_VIDEO_INDEX:{
      return Object.assign({},state,{videoIndex:action.index})
    }
    case NOW_PLAYING.APPEND_TO_QUEUE:{
      let queue = Array.from(state.queue);
      let index = (state.playIndex !== 'notSet') ? state.playIndex + 1 : 0;
      queue.splice(index, 0, action.track);
      return Object.assign({},state,{queue});
    }
    case NOW_PLAYING.TOGGLE_SHUFFLE:{
      return Object.assign({},state,{shuffle:!state.shuffle});
    }
    case NOW_PLAYING.TOGGLE_REPEAT:{
      let repeatIndex = (repeatMap.indexOf(state.repeatType)+1) % 3;
      return Object.assign({},state,{shuffle:false,repeatType:repeatMap[repeatIndex]});
    }
    default:
      return state
  }
}

export default nowPlaying;