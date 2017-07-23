import axios from 'axios';
import Constants from '../lib/Constants';
import { batchActions } from 'redux-batched-actions'

const { APP } = Constants;

export function toggleLogin(){
	return {
		type:APP.TOGGLE_LOGIN
	}
}
