import Constants from '../lib/Constants';

const { APP } = Constants;

const app = (state = {showLogin: false}, action) => {
  switch (action.type) {
  	case APP.TOGGLE_LOGIN:{
  		return Object.assign({},state,{showLogin: !state.showLogin})
  	}
    default:
      return state
  }
}

export default app;