import { connect } from 'react-redux';
import _ from 'lodash';

import Playlist from '../components/Playlist';
import * as HomeActions from '../actions/home';
import * as PlayerActions from '../actions/player';
import * as NowPlayingActions from '../actions/nowPlaying';

function getTracklist(state, props){
	let playlistName = props.location.pathname.split('/')[1];
	switch(playlistName){
		case 'nowPlaying':{
			return state.nowPlaying.queue;
		}
		case 'favourites': {
			return state.user.favourites;
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
	return {
		trackList,
		playlistName : (playlistName !== 'nowPlaying' ) ? playlistName :false
	};
}

function mapDispatchToProps(dispatch) {
  return {
  	...HomeActions,
  	...PlayerActions,
  	...NowPlayingActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Playlist);