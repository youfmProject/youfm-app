import { connect } from 'react-redux';

import Search from '../components/Search';

import * as PlayerActions from '../actions/player';

function mapStateToProps(state, props) {
  	return {
	};
}

function mapDispatchToProps(dispatch) {
  return {
  	...PlayerActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);