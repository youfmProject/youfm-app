import Constants from '../lib/Constants';

const { USER } = Constants;

const user = (state = {userId: '', email:'', password: '', status: true, loginError: false, favourites: []}, action) => {
  switch (action.type) {
      case USER.EDIT_CREDENTIALS: {
        return _.extend({}, state, {[action.field]: action.data});
      }
      case USER.LOGIN_STATUS: {
        return _.extend({}, state, {userId: action.userId, favourites: action.favourites, status: action.status, loginError: action.error});
      }
      default: {
          return state;
      }
    }      
}
export default user;