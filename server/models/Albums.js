'use strict';

import _ from 'lodash';
import async from 'async';
import spotifyClient from 'spotify-web-api-node';
import billboardClient from 'billboard-hot-100';

var spotify = new spotifyClient({
    clientId : '9e8b29bd18634b57bad77f5769cf576f',
    clientSecret : 'bf6760e931944fc69c603799b258a0db',
    redirectUri : 'http://www.youfm.org'
});

class Albums {
    getAlbums(req, callback){
        async.waterfall([
            function(cb){
                spotify.clientCredentialsGrant()
                .then(function(data) {
                    spotify.setAccessToken(data.body['access_token']);
                    cb(null, spotify);
                }, function(err) {
                    console.log('Something went wrong when retrieving an access token', err);
                });
            },
            function(accessToken, cb){
                getSpotifyAlbums(accessToken, cb);
            }
        ],function(er, results){
            callback(null, results);    
        });   
    }

    getSpotifyAlbums(spotify, cb){
        async.parallel({
            newReleases: function(callB) {
                spotify.getNewReleases({ limit : 10, offset: 0, country: 'US' }, function( error, response){
                    if(response){
                        var releases = _.get(response , 'body.albums.items', []);
                        var newReleaseList = [];
                        _.forEach(releases, function(release){
                            var newRelease = {
                                artist: _.get(release, 'artists[0].name'),
                                id: release.id,
                                image: _.get(release, 'images[0].url', ''),
                                albumType: release.album_type,
                                name: release.name
                            };
                            newReleaseList.push(newRelease);
                        });
                        callB(null, newReleaseList);    
                    }else {
                        cb(true, null);
                    }
                    
                });
            },
            featured: function(callB) {
                spotify.getFeaturedPlaylists({ limit : 10, offset: 0, country: 'US', locale: 'en_US', timestamp:'2017-06-06T09:00:00' }, function(error, response){
                    var playlists = _.get(response.body, 'playlists.items', []);
                    var featuredPlaylist = [];
                    _.forEach(playlists, function(playlist){
                        var feature = {
                            id: playlist.id,
                            name: playlist.name,
                            image: _.get(playlist, 'images[0].url', ''),
                            tracks: _.get(playlist, 'tracks.href', '')
                        };
                        featuredPlaylist.push(feature);
                    });
                    callB(null, featuredPlaylist);
                })
                
            },
            billboard: function(callB){
                billboardClient.init().then(function(billboard){
                    var songs = billboard.getAllSongs();
                    var billBoardSongs = [];
                        _.forEach(songs, function(song){
                            var billBoardSong = {
                                name: song.name,
                                artist: song.artist,
                                image: song.artist,
                                rank: song.rank
                            };
                            billBoardSongs.push(billBoardSong);
                        });
                    callB(null, billBoardSongs);
                }).catch(function(err){
                    console.log(err)
                });
            }
        }, function(err, results) {
            console.log(JSON.stringify(results));
            cb(null, results);
        });
    }
}

export default Albums;