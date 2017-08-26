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
		case 'favourites': {
			return state.user.favourites;
		}
		case 'userList':{
			let pN= props.params.playlist;
			return state.playlist.userPlaylist[pN];
		}
		// case 'userList' = //get playlist name from route and then add to tracklist;
		default :{
			return _.get(state.playlist,playlistName,state.playlist[props.location.pathname]);	
		}
	}
}

function mapStateToProps(state, props) {
	let trackList = getTracklist(state, props);
	let playlistName = props.location.pathname.split('/')[1];
	let activetrack = _.get(state.nowPlaying,'queue['+state.nowPlaying.playIndex+']',{name:'',artist:''});
	return {
		user:state.user,
		playlistName : (playlistName !== 'nowPlaying' ) ? playlistName :false,
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