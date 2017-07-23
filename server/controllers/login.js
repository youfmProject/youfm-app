'use strict';

import loginModel from '../models/login';

const callback = (method, response) => {
    return (err, res) => {
        return response.status(200).json(res);
    };
};


module.exports = {
    login: (req, res, next) => {
        let login = new loginModel();
        login.loginUser(req, callback('POST', res));
    }
}