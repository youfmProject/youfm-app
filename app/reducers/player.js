 import Constants from '../lib/Constants';

const { PLAYER } = Constants;

const InitialState ={
    id: '',
    playing: true,
    volume: 0.5,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    screen: null
}
const player = (state = InitialState, action) => {
  switch (action.type) {
  	case PLAYER.TOGGLE_PLAY:{
      return Object.assign({},state,{playing:!state.playing});
  	}
    case PLAYER.START_PLAY:{
      return Object.assign({},state,{id:action.id});
    }
    case PLAYER.PLAYER_RESET:{
      return Object.assign({},state,{id:''});
    }
    case PLAYER.SCREEN_SIZE: {
      return Object.assign( {}, state, {screen: action.screen});
    }
    case PLAYER.SET_VOLUME:{
      return Object.assign( {}, state, {volume: action.volume});
    }
    default:
      return state
  }
}

export default player;