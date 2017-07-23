import { connect } from 'react-redux';

import App from '../components/App';
import * as HomeActions from '../actions/home';
import * as PlayerActions from '../actions/player';
import * as AppActions from '../actions/app';

function mapStateToProps(state, props) {
  let inSync = (props.params.play !== state.player.id) ? props.params.play : false;
  return {
    children:props.children,
    player:state.player,
    searchKey: state.search.searchKey,
    tracks: state.search.tracks,
    showLogin: state.app.showLogin,
    inSync
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...AppActions,
    ...HomeActions,
    ...PlayerActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);