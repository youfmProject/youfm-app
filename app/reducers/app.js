import Constants from '../lib/Constants';

const { APP } = Constants;

<<<<<<< HEAD
const app = (state = {showLogin: false, modal:'',title:'',show:false}, action) => {
=======
const app = (state = {showLogin: false}, action) => {
>>>>>>> upstream/develop
  switch (action.type) {
  	case APP.TOGGLE_LOGIN:{
  		return Object.assign({},state,{showLogin: !state.showLogin})
  	}
<<<<<<< HEAD
  	case APP.TOGGLE_MODAL:{
  		return Object.assign({},state,{modal: action.modal, title:action.title, show:!state.show})
  	}
=======
>>>>>>> upstream/develop
    default:
      return state
  }
}

export default app;