import { connect } from 'react-redux';

import App from '../components/App';
import * as HomeActions from '../actions/home';
import * as PlayerActions from '../actions/player';
import * as AppActions from '../actions/app';
import * as NowPlayingActions from '../actions/nowPlaying';
import * as RoutingActions from '../actions/routing';

function mapStateToProps(state, props) {
  let inSync = (props.params.play !== state.player.id) ? props.params.play : false;
  let searchView = props.location.pathname.split('/')[1];
  let playerHasBooted = (state.nowPlaying.playIndex === 'notSet') ? false: true;
  let searchParam = decodeURI(props.params.list);
  let isSearchSync =  (searchParam !== state.search.searchComplete &&  searchView === 'search' )? searchParam : false;
  return {
    children:props.children,
    player:state.player,
    nowPlaying:state.nowPlaying,
    searchKey: state.search.searchKey,
    tracks: state.search.tracks,
    showLogin: state.app.showLogin,
    user: state.user,
    searchView: searchView,
    inSync,
    playerHasBooted,
    isSearchSync
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...AppActions,
    ...HomeActions,
    ...PlayerActions,
    ...NowPlayingActions,
    ...RoutingActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);