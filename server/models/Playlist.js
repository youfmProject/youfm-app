'use strict';

import _ from 'lodash';
import couchbase from 'couchbase';
var N1qlQuery = couchbase.N1qlQuery;
import async from 'async';
var cluster = new couchbase.Cluster('localhost:8091');

class Playlist {


    updatePlaylist(req, callback){
        var cluster = new couchbase.Cluster('localhost:8091');
        var bucket = cluster.openBucket('default'),
            body = _.get(req, 'body', {}),
            name = _.get(req, 'query.name', ''),
            tracks = body[name],
            id = body.userId;
        //check if name exists and append else upsert.
        bucket.get(id, function(err, res){
            if(err){
                console.log("err in append", err);
                return callback(true, null);
            }
            var fav = _.get(res, 'value.favourites', []);
            fav = _.union(fav, tracks);
            var payload = {
                email: _.get(res, 'value.email', ''),
                password: _.get(res, 'value.password', ''),
                id: _.get(res, 'value.id', ''),
                favourites: fav
            };
            bucket.upsert(id, payload, function(error, response){
                if(!error){
                    return callback(null, {});    
                }
                callback(true, null);
            });
        });
    }
}                 

export default Playlist;