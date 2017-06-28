'use strict';

import _ from 'lodash';
import async from 'async';
import spotifyClient from 'spotify-web-api-node';
import constants from '../lib/constants';

var spotifyApi = new spotifyClient({
    clientId: '9e8b29bd18634b57bad77f5769cf576f',
    clientSecret: 'bf6760e931944fc69c603799b258a0db',
    redirectUri: 'http://www.youfm.org'
});

class spotify {

    constructor() {
        /*Can set context here*/
    }

    searchSpotify(req, callbacks) {
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
                spotifyApi.searchTracks('artist:Love')
                    .then(function(data) {
                        console.log('Search tracks by "Love" in the artist name', data.body);
                        cb(null, data.body);
                    }, function(err) {
                        console.log('Something went wrong!', err);
                        cb(null, spotifyApi);
                    });
            }
        ], function(err, results) {
            callbacks(null, results);
        });
    }
}

export default spotify;