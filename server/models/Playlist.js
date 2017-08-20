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
            var data = _.get(res, 'value', {});
            var playlist = _.cloneDeep(data[name]);
            playlist = _.union(playlist, tracks);
            data[name] = playlist;
            bucket.upsert(id, data, function(error, response){
                if(!error){
                    return callback(null, {});    
                }
                callback(true, null);
            });
        });
    }
}                 

export default Playlist;