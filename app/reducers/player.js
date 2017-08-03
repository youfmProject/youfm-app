 import Constants from '../lib/Constants';

const { PLAYER } = Constants;

const InitialState ={
    id: null,
    playing: true,
    volume: 0.8,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0
}
const player = (state = InitialState, action) => {
  switch (action.type) {
  	case PLAYER.TOGGLE_PLAY:{
  		return Object.assign({},state,{playing:!state.playing});
  	}
    case PLAYER.START_PLAY:{
      return Object.assign({},state,{id:action.id});
    }
    default:
      return state
  }
}

export default player;  
