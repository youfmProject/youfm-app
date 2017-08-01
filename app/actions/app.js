import axios from 'axios';
import Constants from '../lib/Constants';

const { APP } = Constants;

export function toggleLogin(){
	return {
		type:APP.TOGGLE_LOGIN
	}
}
