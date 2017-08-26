import Constants from '../lib/Constants';

const { APP } = Constants;

const app = (state = {showLogin: false, modal:'',title:'',show:false}, action) => {
  switch (action.type) {
  	case APP.TOGGLE_LOGIN:{
  		return Object.assign({},state,{showLogin: !state.showLogin})
  	}
  	case APP.TOGGLE_MODAL:{
  		return Object.assign({},state,{modal: action.modal, title:action.title, show:!state.show})
    } 
    default:
      return state
  }
}

export default app;