import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import home from './home';
import playlist from './playlist';
import search from './search';
import nowPlaying from './nowPlaying';
import player from './player';
import app from './app';
import user from './user';

const rootReducer = combineReducers({
	home,
	playlist,
	search,
	app,
	user,
	nowPlaying,
	player,
	routing
});

export default rootReducer;
