'use strict';

import _ from 'lodash';
import async from 'async';

class Login {
    constructor() {
        /*Can set context here*/
    }

    loginUser(req, callback){
        var body = _.get(req, 'body', {});
        return callback(true, body);
    }
}
export default Login;