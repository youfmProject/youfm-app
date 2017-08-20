'use strict';

import _ from 'lodash';
import couchbase from 'couchbase';
const uuid = require('uuid/v4');
const async = require('async');
var passwordHash = require('password-hash');
var N1qlQuery = couchbase.N1qlQuery;
var cluster = new couchbase.Cluster('localhost:8091');

class Login {


    loginUser(req, callback){
        var cluster = new couchbase.Cluster('localhost:8091');
        var bucket = cluster.openBucket('default');
        var body = _.get(req, 'body', {});
        var query = N1qlQuery.fromString("SELECT * FROM default where email="+body.email);

        async.waterfall([
            function(cb){
                bucket.query(query, function(err, res){
                    var success = false;
                    if(!err){    
                        
                        var email = _.get(res[0], 'default.email', '');
                        var password = _.get(res[0], 'default.password', '');
                        if(body.email === email && passwordHash.verify(body.password, password)){
                            return cb(null, _.get(res[0],'default.id', false));
                        }
                        cb(true, null);
                    }
                    else{
                        cb(true, null);
                    }
                });    
            },
            function(id, cb) {
                if(id){
                    bucket.get(id, function(err, res){
                        return cb(err, _.assign({}, res.value, {userId: id}));                                
                    });
                }
            }
        ], function(err, result){
            if(err){
                return callback(true, {});
            }
            callback(null, result);
        });
    }
    
    registerUser(req, callback){
        var cluster = new couchbase.Cluster('localhost:8091');
        var bucket = cluster.openBucket('default');
        var body = _.get(req, 'body', {});
        var id = uuid();
        var hashedPassword = passwordHash.generate(body.password);
        bucket.upsert(id, {id: id, email: body.email, password: hashedPassword},function(err, result) { 
            if (err)  {
                console.log("errr:", err);
                return callback(true, null);    
            }
            callback(null, {userId: id, favourites: []});
        });
    }
}                 

export default Login;