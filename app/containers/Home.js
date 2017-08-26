import { connect } from 'react-redux';

import Home from '../components/Home';
import * as HomeActions from '../actions/home';
import * as PlayerActions from '../actions/player';
import * as RoutingActions from '../actions/routing';

function mapStateToProps(state, props) {
	let inSync = (props.params.play !== state.player.id) ? props.params.play : false;
	return {
		spotlight:state.home.albums,
		jumbotron:state.home.images.jumbo
	};
}

function mapDispatchToProps(dispatch) {
  return {
  	...HomeActions,
  	...PlayerActions,
	...RoutingActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
