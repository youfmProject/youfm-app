import axios from 'axios';
import Constants from '../lib/Constants';
import { batchActions } from 'redux-batched-actions'
import * as AppActions from '../actions/app';
import * as RoutingActions from './routing';

const { USER } = Constants;

export function editCredentials(field, data){
	return {
		type:USER.EDIT_CREDENTIALS,
        field,
        data
	}
}

function loginStatus(res, error, status){
	return {
		type: USER.LOGIN_STATUS,
		userId: res.userId,
		favourites: res.favourites,
		status,
		error
	}
}

export function submitLogin(user, operation){
	let method = (operation === 'register') ? "post" : "put";
    return(dispatch, getState) => {    
        axios({
		  method: method,
		  url:'/api/v1/login',
          data: user
		}).then(res=>{
			dispatch(batchActions([
				loginStatus(res.data, false, true),
      			AppActions.toggleLogin()
    			])
    		);
			history.back();
		})
		.catch(function(err){
			dispatch(batchActions([
				loginStatus({}, true, false),
      			AppActions.toggleLogin()
    			])
			);
			history.back();
		});
    }
}
