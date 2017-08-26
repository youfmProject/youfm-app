import { connect } from 'react-redux';

import App from '../components/App';
import * as HomeActions from '../actions/home';
import * as PlayerActions from '../actions/player';
import * as AppActions from '../actions/app';
import * as NowPlayingActions from '../actions/nowPlaying';
import * as RoutingActions from '../actions/routing';

function getUsersPlaylist(userPlaylist){
  let list =[];
  for(let item in userPlaylist){
    list.push({ value: item, label: item },)
  }
  return list;
}

function mapStateToProps(state, props) {
  
  let isPlayerInSync = (props.params.play !== state.player.id) ? props.params.play : false;
  let searchView = props.location.pathname.split('/')[1];
  let isPlayerPlaying = (state.nowPlaying.playIndex === 'notSet') ? false: true;
  let searchKey = state.search.searchKey.split('-');
  let usersPlaylist = getUsersPlaylist(state.playlist.userPlaylist);
  return {
    app:state.app,
    children:props.children,
    player:state.player,
    nowPlaying:state.nowPlaying,
    searchKey: searchKey.length > 1 ? searchKey[1] : searchKey[0],
    tracks: state.search.tracks,
    showLogin: state.app.showLogin,
    user: state.user,
    searchView: searchView,
    userPlaylist:state.playlist.userPlaylist,
    isPlayerInSync,
    isPlayerPlaying,
    usersPlaylist
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