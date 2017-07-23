import Constants from '../lib/Constants';

const { USER } = Constants;

const user = (state = {email:'', password: ''}, action) => {
  switch (action.type) {
      case USER.EDIT_CREDENTIALS: {
        return _.extend({}, state, {[action.field]: action.data});
      }
      default: {
          return state;
      }
    }      
}
export default user;