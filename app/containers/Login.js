import { connect } from 'react-redux';

import Login from '../components/Login';

import * as PlayerActions from '../actions/player';
import * as HomeActions from '../actions/home';
import * as AppActions from '../actions/app';
import * as UserActions from '../actions/user';

function mapStateToProps(state, props) {
    return {
        showLogin: state.app.showLogin,
        user: state.user
    }
}   

function mapDispatchToProps(dispatch) {
  return {
    ...AppActions,
    ...UserActions,
  	...PlayerActions,
    ...HomeActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);