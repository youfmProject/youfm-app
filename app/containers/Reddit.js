import { connect } from 'react-redux';
import _ from 'lodash';

import RedditList from '../components/RedditList';
import * as NowPlayingActions from '../actions/nowPlaying';
import * as PlayerActions from '../actions/player';
import * as HomeActions from '../actions/home';

function mapStateToProps(state, props) {
  	return {
      tracks: state.reddit.tracks,
      subReddit: state.reddit.subReddit,
      error: state.reddit.error
	};
}

function mapDispatchToProps(dispatch) {
  return {
  	...PlayerActions,
    ...HomeActions,
    ...NowPlayingActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(RedditList);