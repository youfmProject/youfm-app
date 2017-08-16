import { connect } from 'react-redux';
import _ from 'lodash';

import NowPlaying from '../components/NowPlaying';
import * as HomeActions from '../actions/home';
import * as PlayerActions from '../actions/player';
import * as NowPlayingActions from '../actions/nowPlaying';

function mapStateToProps(state, props) {
	return {
		queue:state.nowPlaying.queue,
		playIndex:state.nowPlaying.playIndex
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

export default connect(mapStateToProps,mapDispatchToProps)(NowPlaying);