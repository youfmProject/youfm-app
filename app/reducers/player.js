 import Constants from '../lib/Constants';

const { PLAYER } = Constants;

const InitialState ={
    id: '',
    playing: true,
    volume: 0.8,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    handleTracker:''
}
const player = (state = InitialState, action) => {
  switch (action.type) {
  	case PLAYER.TOGGLE_PLAY:{
      if(state.handleTracker === 'player' && action.origin ==='react-player'){
        return Object.assign({},state,{handleTracker:action.origin});
      }
      else{
        return Object.assign({},state,{playing:!state.playing, handleTracker:action.origin});
      }
  	}
    case PLAYER.START_PLAY:{
      return Object.assign({},state,{id:action.id,handleTracker:'player'});
    }
    case PLAYER.PLAYER_RESET:{
      return Object.assign({},state,{id:''});
    }
    default:
      return state
  }
}

export default player;