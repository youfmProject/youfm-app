'use strict';

import youtubeModel from '../models/youtube';
import spotifyModel from '../models/spotify';
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
    searchSpotify: (req, res, next) => {
        let Search = new spotifyModel();
        let searchKey = _.get(req, 'query.search', false);
        let artist = _.get(req, 'query.artist', false);

        if(searchKey && !artist){
            Search.searchSpotify(req, callback('GET', res));
        }
        else {
            Search.searchArtists(req, callback('GET', res));
        }
    },
    searchYoutube: (req, res, next) => {
        let Search = new youtubeModel();
        Search.searchYoutube(req, callback('GET', res));
    }
}