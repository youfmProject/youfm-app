import { connect } from 'react-redux';
import _ from 'lodash';

import SearchList from '../components/SearchList';
import * as NowPlayingActions from '../actions/nowPlaying';
import * as PlayerActions from '../actions/player';
import * as HomeActions from '../actions/home';

function mapStateToProps(state, props) {
  	return {
      tracks: state.search.tracks,
      searchKey: state.search.searchKey
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

export default connect(mapStateToProps,mapDispatchToProps)(SearchList);