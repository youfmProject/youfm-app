import { connect } from 'react-redux';

import Home from '../components/Home';
import * as HomeActions from '../actions/home';
import * as PlayerActions from '../actions/player';
import * as RoutingActions from '../actions/routing';
import * as PlaylistActions from '../actions/nowPlaying';

function mapStateToProps(state, props) {
	let inSync = (props.params.play !== state.player.id) ? props.params.play : false;
	return {
		mostPopular: state.playlist.mostPopular,
		heavyRotation: state.playlist.heavyRotation,
  	newReleases: state.playlist.newReleases,
		playerID: state.player.id
	};
}

function mapDispatchToProps(dispatch) {
  return {
  	...HomeActions,
  	...PlayerActions,
		...PlaylistActions,
		...RoutingActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
