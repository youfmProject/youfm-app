import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import home from './home';
import playlist from './playlist';
import search from './search';
import nowPlaying from './nowPlaying';
import player from './player';

const rootReducer = combineReducers({
	home,
	playlist,
	search,
	nowPlaying,
	player,
	routing
});

export default rootReducer;
