import Constants from '../lib/Constants';

const { APP } = Constants;


const app = (state = {modal: '', title: '', show: false}, action) => {

  switch (action.type) {
  	case APP.TOGGLE_MODAL:{
  		return Object.assign({},state,{modal: action.modal, title:action.title, show:!state.show})
    }
    case APP.CHANGE_MODAL: {
      return Object.assign({},state,{modal: action.modal, title:action.title})
    } 
    default:
      return state
  }
}

export default app;