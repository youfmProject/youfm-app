import axios from 'axios';
import Constants from '../lib/Constants';

const { APP } = Constants;

export function toggleLogin(){
	return {
		type:APP.TOGGLE_LOGIN
	}
}

export function toggleModal(modal,title){
	return {
		type:APP.TOGGLE_MODAL,
		modal,
		title
	}
}