import { connect } from 'react-redux';
import _ from 'lodash';

import NowPlaying from '../components/NowPlaying';
import * as HomeActions from '../actions/home';
import * as PlayerActions from '../actions/player';
import * as NowPlayingActions from '../actions/nowPlaying';
import * as AppActions from '../actions/app';

function mapStateToProps(state, props) {
  let queue = state.nowPlaying.queue
  let remainingQueue = state.nowPlaying.shuffle ? queue : queue.slice(state.nowPlaying.playIndex+1, queue.length-1);
  let activetrack = _.get(state.nowPlaying,'queue['+state.nowPlaying.playIndex+']',{name:'',artist:''});
	return {
    user:state.user,
		queue:state.nowPlaying.queue,
		playIndex:state.nowPlaying.playIndex,
    remainingQueue,
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

export default connect(mapStateToProps,mapDispatchToProps)(NowPlaying);