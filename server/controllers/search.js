'use strict';

import youtubeModel from '../models/youtube';
import spotifyModel from '../models/spotify';

const callback = (method, response) => {
    return (err, res) => {
        return response.status(200).json(res);
    };
};


module.exports = {
    searchSpotify: (req, res, next) => {
        let Search = new spotifyModel();
        Search.searchSpotify(req, callback('GET', res));
    },
    searchYoutube: (req, res, next) => {
        let Search = new youtubeModel();
        Search.searchYoutube(req, callback('GET', res));
    }
}