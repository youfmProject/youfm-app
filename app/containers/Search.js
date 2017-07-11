import { connect } from 'react-redux';

import Search from '../components/Search';

function mapStateToProps(state, props) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);