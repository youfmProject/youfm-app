'use strict';

import _ from 'lodash';
import couchbase from 'couchbase';
const async = require('async');
var cluster = new couchbase.Cluster('localhost:8091');
// {
//     "requestID": "84a0f6ac-4319-4cfb-90e6-84c9266775a0",
//     "signature": {
//         "*": "*"
//     },
//     "results": [
//         {
//             "default": {
//                 "email": "shreyas",
//                 "favourites": [
//                     {
//                         "artist": "\nLuis Fonsi \u0026 Daddy Yankee Featuring Justin Bieber\n",
//                         "image": "http://www.billboard.com/images/pref_images/q61808osztw.jpg",
//                         "name": "Despacito",
//                         "rank": "1"
//                     },
//                     {
//                         "artist": "\nDJ Khaled Featuring Rihanna \u0026 Bryson Tiller\n",
//                         "image": "http://www.billboard.com/images/pref_images/q64532pl64x.jpg",
//                         "name": "Wild Thoughts",
//                         "rank": "2"
//                     }
//                 ],
//                 "id": "133f0dae-3608-4c13-b77d-65cbf3d10203",
//                 "password": "11111111"
//             }
//         }
//     ],
//     "status": "success",
//     "metrics": {
//         "elapsedTime": "24.490614ms",
//         "executionTime": "24.461952ms",
//         "resultCount": 1,
//         "resultSize": 871
//     }
// }



class Password {

    resetPassword(req, callback){
        var cluster = new couchbase.Cluster('localhost:8091'),
            bucket = cluster.openBucket('default'),
            body = _.get(req, 'body', {}),
            userId = _.get(body, 'userId', '');
        async.waterfall([
            function(cb){
                bucket.get(userId, function(err, res){
                    let user = _.get(res, 'value', {});
                    cb(null, user);
                });
            },
            function(user, cb){
                user.password = _.get(body, 'password', '');
                bucket.upsert(userId, user, function(err, res){
                    cb(null, {});
                });
            }

        ], function(error, response){
            callback(null, {});
        });
    }

    sendEmail(req, callback){
        var cluster = new couchbase.Cluster('localhost:8091'),
            bucket = cluster.openBucket('default'),
            body = _.get(req, 'body', {}),
            email = _.get(res[0], 'default.email', '');
            //send email using some crap
            callback(null, {});
    }



}
export default Password;