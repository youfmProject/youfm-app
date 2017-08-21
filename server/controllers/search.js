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
        let album = _.get(req, 'query.album', false);
        let type, query = '';
        if(searchKey){
            query = searchKey;
        }
        else if(artist) {
            type = 'artist';
            query = artist;
        }
        else {
            type = 'album';
            query = album;
        }
        Search.searchSpotify(req, type, query, callback('GET', res));
    },
    searchYoutube: (req, res, next) => {
        let Search = new youtubeModel();
        Search.searchYoutube(req, callback('GET', res));
    }
}