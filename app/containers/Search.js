import { connect } from 'react-redux';

import Search from '../components/Search';

import * as PlayerActions from '../actions/player';

function mapStateToProps(state, props) {
	let inSync = (props.params.play !== state.player.id) ? props.params.play : false
  	return {
  		player:state.player,
		inSync
	};
}

function mapDispatchToProps(dispatch) {
  return {
  	...PlayerActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);