import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Playlist from './containers/Playlist';
import Login from './containers/Login';
import Search from './containers/Search';
import * as HomeActions from './actions/home';

export default (
  	<Route path="/" component={App} onEnter={dispatch => dispatch(HomeActions.getHomeData())}>
  		<IndexRoute component={Home}/>
  		<Route path="/home(/:play)" component={Home} />
		<Route path="/search(/:list)(/:play)" component={Search} />
		<Route path="/heavyRotation(/:play)(/:list)" component={Playlist} />
		<Route path="/nowPlaying(/:play)(/:list)" component={Playlist} />
		<Route path="/newReleases(/:play)(/:list)" component={Playlist} />
		<Route path="/mostPopular(/:play)(/:list)" component={Playlist} />
		<Route path="/userList(/:play)(/:list)(/:playlist)" component={Playlist} />
		<Route path="/login" component={Login}/>
		<Route path="/register" component={Login}/>
	</Route>
);
