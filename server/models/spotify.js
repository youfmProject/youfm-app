'use strict';

import _ from 'lodash';
import async from 'async';
import spotifyClient from 'spotify-web-api-node';
import constants from '../lib/constants';

const https = require('https');
var request = require('request');


var spotifyApi = new spotifyClient({
    clientId: '9e8b29bd18634b57bad77f5769cf576f',
    clientSecret: 'bf6760e931944fc69c603799b258a0db',
    redirectUri: 'http://www.youfm.org'
});

class spotify {

    constructor() {
        /*Can set context here*/
    }

    searchSpotify(req, type, query, callback) {
        var searchQuery = type ? type+':'+query : query;
        async.waterfall([
            function(cb) {
                spotifyApi.clientCredentialsGrant()
                    .then(function(data) {
                        spotifyApi.setAccessToken(data.body['access_token']);
                        cb(null, spotifyApi);
                    }, function(err) {
                        console.log('Something went wrong when retrieving an access token', err);
                    });
            },
            function(accessToken, cb) {
                spotifyApi.searchTracks(searchQuery)
                    .then(function(data) {
                        var searchResults = [];
                        var tracks = _.get(data, 'body.tracks.items', []);
                        if(tracks.length){
                            _.forEach(tracks, function(track){
                                searchResults.push({
                                    image: _.get(track, 'album.images[0].url', ''),
                                    name: track.name,
                                    artist: _.get(track, 'artists[0].name', ''),
                                    albumName: _.get(track, 'album.name', '')
                                });
                            });
                            cb(null, searchResults);
                        }
                        else {
                            cb(true, []);
                        }
                    }, function(err) {
                        console.log('Something went wrong!', err);
                        cb(true, []);
                    });
            }
        ], function(err, results) {
            if(err){
                return callback(true, []);
            }
            callback(null, results);
        });
    }
    
}

export default spotify;