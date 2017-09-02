// 'use strict';

// import _ from 'lodash';
// import couchbase from 'couchbase';
// const async = require('async');
// var cluster = new couchbase.Cluster('localhost:8091');
// const nodemailer = require('nodemailer');

// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     auth: {
//         user: 'youfmorg@gmail.com',
//         pass: 'access123'
//     }
// });

// class Password {

//     resetPassword(req, callback){
//         var cluster = new couchbase.Cluster('localhost:8091'),
//             bucket = cluster.openBucket('default'),
//             body = _.get(req, 'body', {}),
//             userId = _.get(body, 'userId', '');
//         async.waterfall([
//             function(cb){
//                 bucket.get(userId, function(err, res){
//                     let user = _.get(res, 'value', {});
//                     cb(null, user);
//                 });
//             },
//             function(user, cb){
//                 user.password = _.get(body, 'password', '');
//                 bucket.upsert(userId, user, function(err, res){
//                     cb(null, {});
//                 });
//             }

//         ], function(error, response){
//             callback(null, {});
//         });
//     }

//     sendEmail(req, callback){
//         var body = _.get(req, 'body', {}),
//             userId = _.get(body, 'userId', '');
//             let mailOptions = {
//                 from: 'youfmorg@gmail.com', // sender address
//                 to: body.email, // list of receivers
//                 subject: 'LiveJam: Reset Password', // Subject line
//                 text: 'Click on the link to reset your password. http://www.livejam.com/resetpassword/'+userId, // plain text body
//                 html: '<b>Hello world ?</b>' // html body
//             };
//             // send mail with defined transport object
//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     console.log(error);
//                     return callback(true, null);
//                 }
//                 console.log('Message %s sent: %s', info.messageId, info.response);
//                 callback(null, {});
//             });
//     }



// }
// export default Password;