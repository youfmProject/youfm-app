// 'use strict';

// import _ from 'lodash';
// import couchbase from 'couchbase';
// var N1qlQuery = couchbase.N1qlQuery;
// import async from 'async';
// var cluster = new couchbase.Cluster('localhost:8091');

// class Playlist {


//     updatePlaylist(req, callback){
//         var cluster = new couchbase.Cluster('localhost:8091');
//         var bucket = cluster.openBucket('default'),
//             body = _.get(req, 'body', {}),
//             playlists = _.get(body, 'playlists', {}),
//             id = body.userId;
//         //check if name exists and append else upsert.
//         bucket.get(id, function(err, res){
//             if(err){
//                 console.log("err in append", err);
//                 return callback(true, null);
//             }
//             var data = _.get(res, 'value', {});
//             var userPlaylists = _.get(data, 'playlists', {});
//             _.forOwn(playlists, function(playlist, name){
//                 var list = userPlaylists[name] ? _.cloneDeep(userPlaylists[name]) : [];
//                 list = _.union(list, playlist);  
//                 userPlaylists[name] = list;  
//             });
//             data.playlists = userPlaylists;
//             bucket.upsert(id, data, function(error, response){
//                 if(!error){
//                     return callback(null, {});    
//                 }
//                 callback(true, null);
//             });
//         });
//     }
// }                 

// export default Playlist;