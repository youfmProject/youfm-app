'use strict';

import passwordModel from '../models/Password';
import _ from 'lodash';

const callback = (method, response) => {
    return (err, res) => {
         if(err) {
            return response.status(500).json(err);
        }
        return response.status(200).json(res);
    };
};


module.exports = {
    resetPassword: (req, res, next) => {
        let password = new passwordModel();
        let type = _.get(req, 'query.type', '');
        
        if(type === 'email'){
            password.sendEmail(req, callback('PUT', res));
        }
        else {
            password.resetPassword(req, callback('PUT', res));
        }
    }
}