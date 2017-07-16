import React from 'react';
import { Route, Router } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Search from './containers/Search';
import Playlist from './containers/Playlist';

export default (
  	<Route path="/" component={App}>
  		<Route path="/home(/:play)" component={Home}/>
		<Route path="/search/:list/:play" component={Search}/>
		<Route path="/heavyRotation(/:list/:play)" component={Playlist}/>
		<Route path="/nowPlaying(/:list/:play)" component={Playlist}/>
		<Route path="/newReleases(/:list/:play)" component={Playlist}/>
		<Route path="/mostPopular(/:list/:play)" component={Playlist}/>
		<Route path="/userList(/:playlist/:list/:play)" component={Playlist}/>
	</Route>
);
