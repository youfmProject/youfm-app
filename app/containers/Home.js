import { connect } from 'react-redux';

import Home from '../components/Home';
import * as HomeActions from '../actions/home';

function mapStateToProps(state, props) {
  return {
    tracks:state.home.tracks
  };
}

function mapDispatchToProps(dispatch) {
  return {
  	...HomeActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
