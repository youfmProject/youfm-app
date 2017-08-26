import { connect } from 'react-redux';
import _ from 'lodash';

import SearchList from '../components/SearchList';
import * as NowPlayingActions from '../actions/nowPlaying';
import * as PlayerActions from '../actions/player';
import * as HomeActions from '../actions/home';
<<<<<<< HEAD
import * as AppActions from '../actions/app';

function mapStateToProps(state, props) {
  let activetrack = _.get(state.nowPlaying,'queue['+state.nowPlaying.playIndex+']',{name:'',artist:''});
  	return {
      user:state.user,
      tracks: state.search.tracks,
      searchKey: state.search.searchKey,
      error: state.search.error,
      activetrack
=======

function mapStateToProps(state, props) {
  	return {
      tracks: state.search.tracks,
      searchKey: state.search.searchKey,
      error: state.search.error
>>>>>>> upstream/develop
	};
}

function mapDispatchToProps(dispatch) {
  return {
<<<<<<< HEAD
    ...AppActions,
=======
>>>>>>> upstream/develop
  	...PlayerActions,
    ...HomeActions,
    ...NowPlayingActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchList);