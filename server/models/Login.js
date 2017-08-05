'use strict';

import _ from 'lodash';

import couchbase from 'couchbase';
var cluster = new couchbase.Cluster('localhost:8091');

class Login {


    loginUser(req, callback){
        var cluster = new couchbase.Cluster('localhost:8091');
        var bucket = cluster.openBucket('default');
        var body = _.get(req, 'body', {});
        bucket.get(body.email, function(err, result) { 
            var value = _.get(result, 'value', {});
            if(!err && value.password === body.password){
                return callback(null, {});
            }
            callback(true, null);
        });    
    }
    
    registerUser(req, callback){
        var cluster = new couchbase.Cluster('localhost:8091');
        var bucket = cluster.openBucket('default');
        var body = _.get(req, 'body', {});
        bucket.upsert(body.email, {email: body.email, password: body.password},function(err, result) { 
            if (err)  {
                console.log("errr:", err);
                return callback(true, null);    
            }
            return callback(null, {});
        });
    }
}
export default Login;