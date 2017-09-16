import { connect } from 'react-redux';
import _ from 'lodash';

import Playlist from '../components/Playlist';
import * as HomeActions from '../actions/home';
import * as PlayerActions from '../actions/player';
import * as NowPlayingActions from '../actions/nowPlaying';
import * as AppActions from '../actions/app';

function getTracklist(state, props){
	let playlistName = props.location.pathname.split('/')[1];
	switch(playlistName){
		case 'nowPlaying':{
			return state.nowPlaying.queue;
		}
		case 'userList':{
			let pN= props.params.playlist;
			return state.playlist.userList[pN];
		}
		case 'r': {
			return state.reddit.tracks;
		}
		case 'search': {
			return state.search.tracks;
		}
		// case 'userList' = //get playlist name from route and then add to tracklist;
		default :{
			return _.get(state.playlist,playlistName,state.playlist[props.location.pathname]);	
		}
	}
};

function getErrors(state, props){
	let playlistName = props.location.pathname.split('/')[1];
	switch(playlistName){
		case 'r': {
			return state.reddit.error;
		}
		case 'search': {
			return state.search.error;
		}
		default: {
			return false;
		}
	}
};

function mapStateToProps(state, props) {
	let trackList = getTracklist(state, props);
	let playlistName = props.location.pathname.split('/')[1];
	let activetrack = _.get(state.nowPlaying,'queue['+state.nowPlaying.playIndex+']',{name:'',artist:''});
	let errors = getErrors(state, props);
	return {
		user:state.user,
		playlistName : (playlistName !== 'nowPlaying' ) ? playlistName :false,
		trayIndex:state.playlist.trayIndex,
		errors, 
		trackList,
		activetrack
	};
}

function mapDispatchToProps(dispatch) {
  return {
  	...AppActions,
  	...HomeActions,
  	...PlayerActions,
  	...NowPlayingActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Playlist);