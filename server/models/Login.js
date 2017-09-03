'use strict';

import _ from 'lodash';
import couchbase from 'couchbase';
const uuid = require('uuid/v4');
const async = require('async');
var passwordHash = require('password-hash');
var N1qlQuery = couchbase.N1qlQuery;
var cluster = new couchbase.Cluster('localhost:8091');
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'youfmorg@gmail.com',
        pass: 'access123'
    }
});

class Login {

    loginUser(req, callback){
        var cluster = new couchbase.Cluster('localhost:8091');
        var bucket = cluster.openBucket('default');
        var body = _.get(req, 'body', {});
        var query = N1qlQuery.fromString('select * from default where email="' + body.email + '"');
        async.waterfall([
            function(cb){
                bucket.query(query, function(err, res){
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
                        return cb(null, {userId: id, playlists: _.get(res, 'value.playlists', {})});
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
        async.parallel({
            'bucket': function(cb){
                bucket.upsert(id, {id: id, email: body.email, password: hashedPassword},function(err, result) { 
                    if (err)  {
                        console.log("errr:", err);
                        return cb(true, null);
                    }
                    cb(null, {userId: id, playlists: {}});
                });
            },
            'email': function(cb){
                let mailOptions = {
                    from: 'youfmorg@gmail.com', // sender address
                    to: body.email, // list of receivers
                    subject: 'Welcome to LiveJam ✔', // Subject line
                    text: 'Hello, Welcome to LiveJam!', // plain text body
                    html: '<b>Hello world ?</b>' // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                    cb(null, {});
                });
            }
        }, function(err, res){
            if(err) {
                return callback(true, null);
            }
            callback(null, res.bucket); 
        });
    }
}                 

export default Login;