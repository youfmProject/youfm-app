import { connect } from 'react-redux';

import Password from '../components/Password';

import * as PlayerActions from '../actions/player';
import * as HomeActions from '../actions/home';
import * as AppActions from '../actions/app';
import * as UserActions from '../actions/user';
import * as RoutingActions from '../actions/routing';

function mapStateToProps(state, props) {
    return {
        user: state.user,
        userId: props.params.id
    }
}   

function mapDispatchToProps(dispatch) {
  return {
    ...AppActions,
    ...UserActions,
  	...PlayerActions,
    ...HomeActions,
    ...RoutingActions,
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Password);