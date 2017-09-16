import axios from 'axios';
import Constants from '../lib/Constants';

const { APP } = Constants;

export function toggleModal(modal,title){
	return {
		type:APP.TOGGLE_MODAL,
		modal,
		title
	}
}

export function changeModal(modal, title){
	return {
		type:APP.CHANGE_MODAL,
		modal,
		title
	}
}
