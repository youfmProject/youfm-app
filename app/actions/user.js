import axios from 'axios';
import Constants from '../lib/Constants';
import { batchActions } from 'redux-batched-actions'
import * as AppActions from '../actions/app';
import * as RoutingActions from './routing';
import * as HomeActions from './home';

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
		playlists: res.playlists,
		status,
		error
	};
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
				HomeActions.setLocalStore({userStatus:{userId: res.data.userId, status: true}}),
				HomeActions.setPlaylist('userList', res.data.playlists),
      			AppActions.toggleModal('','')
    			])
    		);
		})
		.catch(function(err){
			loginStatus({}, true, false)
		});
    }
}

export function submitPassword( user, type ){
	return (dispatch, getState) => {
		axios({
		  method: 'put',
		  url:'/api/v1/password?type='+type,
          data: user
		}).then(res => {
			dispatch(batchActions([
				RoutingActions.locationChange('/home'),
				AppActions.toggleModal('Login','Login')
			]));
		});
	}
}
