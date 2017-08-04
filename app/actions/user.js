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

export function submitLogin(user, operation){
	let method = operation === 'register' ? post : put;
    return(dispatch, getState) => {    
        axios({
		  method: method,
		  url:'/api/v1/login',
          data: user
		}).then(res=>{
			dispatch(batchActions([
				RoutingActions.locationChange('/home'),
      			AppActions.toggleLogin()
    			])
    		);
		});
    }
}
