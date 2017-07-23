import axios from 'axios';
import Constants from '../lib/Constants';
import { batchActions } from 'redux-batched-actions'
import * as AppActions from '../actions/app';

const { USER } = Constants;

export function editCredentials(field, data){
	return {
		type:USER.EDIT_CREDENTIALS,
        field,
        data
	}
}

export function submitLogin(user){
    return(dispatch, getState) => {    
        axios({
		  method:'post',
		  url:'/api/v1/login',
          data: user
		}).then(res=>{
			dispatch(AppActions.toggleLogin());
		});
    }
}
