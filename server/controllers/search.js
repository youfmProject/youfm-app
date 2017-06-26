'use strict';

import Search from '../models/Search';

const callback = (method, response) => {
    return (err, res) => {
        return response.status(200).json(res);
    };
};


module.exports = {
    searchSpotify: (req, res, next) => {
        let Search = new Search();
        Search.searchSpotify(req, callback('GET', res));
    },
    searchYoutube: (req, res, next) => {
        let Search = new Search();
        Search.searchYoutube(req, callback('GET', res));
    }
}