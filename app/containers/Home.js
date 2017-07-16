import { connect } from 'react-redux';

import Home from '../components/Home';
import * as HomeActions from '../actions/home';

function mapStateToProps(state, props) {
  return {
    spotlight:state.home.albums,
    jumbotron:state.home.images.jumbo
  };
}

function mapDispatchToProps(dispatch) {
  return {
  	...HomeActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
