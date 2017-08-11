'use strict';

import _ from 'lodash';
import couchbase from 'couchbase';
var N1qlQuery = couchbase.N1qlQuery;
import async from 'async';
var cluster = new couchbase.Cluster('localhost:8091');

class Playlist {


    updatePlaylist(req, callback){
        var cluster = new couchbase.Cluster('localhost:8091');
        var bucket = cluster.openBucket('default');
        var tracks = _.get(req, 'body', []);
        var name = _.get(req, 'query.name', '');
        var id = _.get(req, 'query.id', '');
        //check if name exists and append else upsert.
        async.waterfall([
            function(cb){
                bucket.lookupIn(id).exists(name).execute(function(err, res){
                    if(err){
                        return cb(null, false);
                    }
                    cb(null, true);
                });
            },
            function( append, cb){
                if(append){
                    bucket.mutateIn(id).arrayAppend(name, tracks).execute(function(err, res){
                        if(err){
                            return cb(true, null);
                        }
                        cb(bull, []);
                    });
                }
                else {
                    bucket.mutateIn(id).upsert(name, tracks).execute(function(err, res){
                        if(err){
                            console.log(err);
                        }
                        console.log(res);
                        cb(null, res);
                    });
                }
            }
        ], function(error, results){
            if(error){
                return callback(true, null);
            }
            callback(null, []);
        });
    }
}                 

export default Playlist;