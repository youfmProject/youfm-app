import { connect } from 'react-redux';

import Search from '../components/Search';

import * as PlayerActions from '../actions/player';
import * as HomeActions from '../actions/home';

function mapStateToProps(state, props) {
  	return {
      searchTracks: state.search.tracks,
      searchKey: state.search.searchKey
	};
}

function mapDispatchToProps(dispatch) {
  return {
  	...PlayerActions,
    ...HomeActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);