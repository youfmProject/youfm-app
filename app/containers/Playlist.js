import { connect } from 'react-redux';
import _ from 'lodash';

import Playlist from '../components/Playlist';
import * as HomeActions from '../actions/home';
import * as PlayerActions from '../actions/player';

function mapStateToProps(state, props) {
	let playlistName = props.location.pathname.split('/')[1];
	return {
		trackList:_.get(state.playlist,playlistName,state.playlist[props.location.pathname])
	};
}

function mapDispatchToProps(dispatch) {
  return {
  	...HomeActions,
  	...PlayerActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Playlist);