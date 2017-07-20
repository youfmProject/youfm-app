import { connect } from 'react-redux';

import Home from '../components/Home';
import * as HomeActions from '../actions/home';
import * as PlayerActions from '../actions/player';

function mapStateToProps(state, props) {
	let inSync = (props.params.play !== state.player.id) ? props.params.play : false
	return {
		spotlight:state.home.albums,
		jumbotron:state.home.images.jumbo,
		player:state.player,
		inSync
	};
}

function mapDispatchToProps(dispatch) {
  return {
  	...HomeActions,
  	...PlayerActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
