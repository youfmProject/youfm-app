import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Search from './containers/Search';
import Playlist from './containers/Playlist';

export default (
  	<Route path="/" component={App}>
  		<IndexRoute component={Home}/>
  		<Route path="/home(/:play)" component={Home}/>
		<Route path="/search(/:play)(/:list)" component={Search}/>
		<Route path="/heavyRotation(/:play)(/:list)" component={Playlist}/>
		<Route path="/nowPlaying(/:play)(/:list)" component={Playlist}/>
		<Route path="/newReleases(/:play)(/:list)" component={Playlist}/>
		<Route path="/mostPopular(/:play)(/:list)" component={Playlist}/>
		<Route path="/userList(/:play)(/:list)(/:playlist)" component={Playlist}/>
	</Route>
);
