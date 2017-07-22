import { connect } from 'react-redux';

import App from '../components/App';
import * as HomeActions from '../actions/home';
import * as PlayerActions from '../actions/player';

function mapStateToProps(state, props) {
  let inSync = (props.params.play !== state.player.id) ? props.params.play : false;
  return {
    children:props.children,
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

export default connect(mapStateToProps,mapDispatchToProps)(App);