import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Playlist from './containers/Playlist';
import NowPlaying from './containers/NowPlaying';
import Login from './containers/Login';
import Register from './containers/Register';
import Password from './containers/Password';
import Search from './containers/Search';
import * as HomeActions from './actions/home';

export default (
  	<Route path="/" component={App} onEnter={dispatch => dispatch(HomeActions.getHomeData())}>
  		<IndexRoute component={Home}/>
  		<Route path="/home(/:play)" component={Home}/>
		<Route path="/search(/:list)(/:play)" component={Search} />
		<Route path="/heavyRotation(/:play)(/:list)" component={Playlist} />
		<Route path="/nowPlaying(/:play)(/:list)" component={NowPlaying} />
		<Route path="/newReleases(/:play)(/:list)" component={Playlist} />
		<Route path="/mostPopular(/:play)(/:list)" component={Playlist} />
		<Route path="/favourites(/:play)(/:list)" component={Playlist} />
		<Route path="/userList(/:play)(/:list)(/:playlist)" component={Playlist} />
		<Route path="/Login(/:play)" component={Login}/>
		<Route path="/Register(/:play)" component={Register}/>
		<Route path="/resetPassword(/:id)" component={Password}/>
	</Route>
);
