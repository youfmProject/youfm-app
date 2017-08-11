'use strict';

import _ from 'lodash';
import request from 'request';
import couchbase from 'couchbase';
var N1qlQuery = couchbase.N1qlQuery;
var cluster = new couchbase.Cluster('localhost:8091');

var ses = 'https://email.us-west-2.amazonaws.com/?Action=SendEmail&Source=youfmorg%40gmail.com&Destination.ToAddresses.member.1=shreyasg%40buffalo.edu&Message.Subject.Data=This%20is%20the%20subject%20line.&Message.Body.Text.Data=Hello.%20I%20hope%20you%20are%20having%20a%20good%20day.&AWSAccessKeyId=AKIAILEKDPHTV4YXH65A&Signature=xhM0S5tJTUGEVut7OwQL6ZKTGTohUZhuw9B/CM6b&Algorithm=HMACSHA256';

class Login {


    loginUser(req, callback){
        var cluster = new couchbase.Cluster('localhost:8091');
        var bucket = cluster.openBucket('default');
        var body = _.get(req, 'body', {});
        var query = N1qlQuery.fromString("SELECT * FROM default");
        async.waterfall([
        function(cb){
            bucket.query(query, function(err, res){
                _.forEach(res, function(doc){
                    var email = _.get(doc, 'default.email', '');
                    var password = _.get(doc, 'default.password', '');
                    if(body.email === email && body.password === password){
                        return cb(null, {id: _.get(doc,'default.id', '')});
                    }
                });
                cb(true, null);
            });    
        },
        function(id, cb) {
            bucket.get(id, function(err, res){
                if(!err){
                    cb(null,{favourites: _.get(res, 'value.fav', [])});        
                }
                cb(true, null);
            })
        }
        ], function(err, result){
            if(err){
                return callback(true, []);
            }
            callback(null, []);
        });
    }
    
    registerUser(req, callback){
        var cluster = new couchbase.Cluster('localhost:8091');
        var bucket = cluster.openBucket('default');
        var body = _.get(req, 'body', {});
        var id = body.email+ '::' + Math.random();
        bucket.upsert(id, {id: id, email: body.email, password: body.password},function(err, result) { 
            if (err)  {
                console.log("errr:", err);
                return callback(true, null);    
            }
            callback(null, {id: id});
        });
    }
}                 

export default Login;