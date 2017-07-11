import { connect } from 'react-redux';

import Playlist from '../components/Playlist';

function mapStateToProps(state, props) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Playlist);