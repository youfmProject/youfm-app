import { connect } from 'react-redux';
import _ from 'lodash';

import Playlist from '../components/Playlist';
import * as HomeActions from '../actions/home';
import * as PlayerActions from '../actions/player';
import * as NowPlayingActions from '../actions/nowPlaying';
<<<<<<< HEAD
import * as AppActions from '../actions/app';
=======
>>>>>>> upstream/develop

function getTracklist(state, props){
	let playlistName = props.location.pathname.split('/')[1];
	switch(playlistName){
		case 'nowPlaying':{
			return state.nowPlaying.queue;
		}
		case 'favourites': {
			return state.user.favourites;
		}
<<<<<<< HEAD
		case 'userList':{
			let pN= props.params.playlist;
			return state.playlist.userPlaylist[pN];
		}
=======
>>>>>>> upstream/develop
		// case 'userList' = //get playlist name from route and then add to tracklist;
		default :{
			return _.get(state.playlist,playlistName,state.playlist[props.location.pathname]);	
		}
	}
}

function mapStateToProps(state, props) {
	let trackList = getTracklist(state, props);
	let playlistName = props.location.pathname.split('/')[1];
<<<<<<< HEAD
	let activetrack = _.get(state.nowPlaying,'queue['+state.nowPlaying.playIndex+']',{name:'',artist:''});
	return {
		user:state.user,
		playlistName : (playlistName !== 'nowPlaying' ) ? playlistName :false,
		trackList,
		activetrack
=======
	return {
		trackList,
		playlistName : (playlistName !== 'nowPlaying' ) ? playlistName :false
>>>>>>> upstream/develop
	};
}

function mapDispatchToProps(dispatch) {
  return {
<<<<<<< HEAD
  	...AppActions,
=======
>>>>>>> upstream/develop
  	...HomeActions,
  	...PlayerActions,
  	...NowPlayingActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Playlist);