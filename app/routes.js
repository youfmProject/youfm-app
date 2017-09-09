import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Playlist from './containers/Playlist';
import NowPlaying from './containers/NowPlaying';
import Password from './containers/Password';
import * as HomeActions from './actions/home';

export default (
  	<Route path="/" component={App} onEnter={dispatch => dispatch(HomeActions.getHomeData())}>
  		<IndexRoute component={Home}/>
  		<Route path="/home(/:play)" component={Home}/>
		<Route path="/search(/:list)(/:play)" component={Playlist} />
		<Route path="/heavyRotation(/:play)(/:list)" component={Playlist} />
		<Route path="/nowPlaying(/:play)(/:list)" component={NowPlaying} />
		<Route path="/newReleases(/:play)(/:list)" component={Playlist} />
		<Route path="/mostPopular(/:play)(/:list)" component={Playlist} />
		<Route path="/history(/:play)(/:list)" component={Playlist} />
		<Route path="/favourite(/:play)(/:list)" component={Playlist} />
		<Route path="/userList(/:playlist)(/:play)(/:list)" component={Playlist} />
		<Route path="/resetPassword(/:id)" component={Password}/>
		<Route path="/r(/:list)(/:play)" component={Playlist}/>
	</Route>
);
