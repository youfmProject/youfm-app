'use strict';

import _ from 'lodash';
import async from 'async';
import spotifyClient from 'spotify-web-api-node';
import path from 'path';
import couchbase from 'couchbase';
var N1qlQuery = couchbase.N1qlQuery;
var cluster = new couchbase.Cluster('localhost:8091');
var reddit = require('../lib/redditHelper');
var spotify = new spotifyClient({
    clientId : '9e8b29bd18634b57bad77f5769cf576f',
    clientSecret : 'bf6760e931944fc69c603799b258a0db',
    redirectUri : 'http://www.youfm.org'
});

class Albums {
    constructor() {
        /*Can set context here*/
    }

    getAlbums(req, callback){
        var results = _.get(req, 'session.albums', false);
        if(results){
            return callback(null, results);
        }
        async.waterfall([
            function(cb){
                spotify.clientCredentialsGrant()
                .then(function(data) {
                    spotify.setAccessToken(data.body['access_token']);
                    cb(null, spotify);
                }, function(err) {
                    console.log('Something went wrong when retrieving an access token', err);
                    cb(err, null);
                });
            },
            function(spotify, cb){
                this.getSpotifyAlbums(spotify, req, cb);
            }.bind(this)
        ],function(err, results){
            if(err){
                return callback(true, null);
            }
            req.session.albums = results;
            callback(null, results);    
        });   
    }

    getSpotifyAlbums(spotify, req, cb){
        async.parallel({
            newReleases: function(callB) {
                spotify.getNewReleases({ limit : 50, offset: 0, country: 'US' }, function( error, response){
                    if(response){
                        var releases = _.get(response , 'body.albums.items', []);
                        var newReleaseList = [];
                        _.forEach(releases, function(release){
                            var newRelease = {
                                artist: _.get(release, 'artists[0].name'),
                                albumId: release.id,
                                image: _.get(release, 'images[0].url', ''),
                                albumType: release.album_type,
                                artistId: _.get(release, 'artists[0].id', ''),
                                name: release.name
                            };
                            newReleaseList.push(newRelease);
                        });
                        callB(null, newReleaseList);    
                    }else {
                        callB(true, null);
                    }
                    
                });
            },
            popular: function(callB) {
                spotify.getPlaylist('spotify', '37i9dQZF1DXcBWIGoYBM5M').then(function(data){
                    var songs = [],
                    tracks = _.get(data, 'body.tracks.items',[]);
                    _.forEach(tracks, function(track){
                        songs.push({
                            name: _.get(track, 'track.name', ''),
                            artist: _.get(track, 'track.album.artists[0].name', ''),
                            artistId: _.get(track, 'track.album.artists[0].id', ''),
                            image: _.get(track, 'track.album.images[0].url', '')
                        })
                    });
                    callB(null, songs);
                },function(err){
                    console.log("err::", err);
                    callB(null, []);
                });
            },
            billboard: function(callB){
                spotify.getPlaylist('billboard.com', '6UeSakyzhiEt4NB3UAd6NQ').then(function(data){
                    var songs = [],
                        tracks = _.get(data, 'body.tracks.items',[]);
                    _.forEach(tracks, function(track){
                        songs.push({
                            name: _.get(track, 'track.name', ''),
                            artist: _.get(track, 'track.album.artists[0].name', ''),
                            artistId: _.get(track, 'track.album.artists[0].id', ''),
                            image: _.get(track, 'track.album.images[0].url', '')
                        })
                    });
                    callB(null, songs);
                },function(err){
                    console.log("err::", err);
                    callB(null, []);
                });
            },
            images: function(callB) {
                let imageList = {
                    jumbo: path.resolve(__dirname ,'../../app/images/u2-home-bg.png'),
                    logo: path.resolve(__dirname ,'../../app/images/youFm.svg')
                }
                callB(null, imageList);
            },
            userInfo: function(callB){
                var userId = _.get(req, 'body.userId', false);
                if(userId){
                    var bucket = cluster.openBucket('default');
                    var query = N1qlQuery.fromString('select * from default where id="' + userId + '"');
                    bucket.query(query, function(err, res){
                        if(!err){
                         return  callB(null, {userId: userId, playlists: _.get(res[0],'default.playlists', false)})
                        }
                    });
                }
                callB(null, {});
            }
        }, function(err, results) {
            if(err){
                return cb(err, null);
            }
            cb(null, results);
        });
    }
}

export default Albums;