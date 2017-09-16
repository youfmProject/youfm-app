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
        let id = _.get(req, 'query.id', false);
        if(searchKey){
            Search.searchSpotify(req, null, searchKey, callback('GET', res));
        }
        else if(artist) {
            if(id !== 'undefined'){
                Search.searchArtist(req, artist, callback('GET', res));
            }
            else {
                Search.searchSpotify(req, 'artist', artist, callback('GET', res));
            }
        }
        else {
            Search.searchAlbum(req, album, callback('GET', res));
        }
    },
    searchYoutube: (req, res, next) => {
        let Search = new youtubeModel();
        Search.searchYoutube(req, callback('GET', res));
    }
}