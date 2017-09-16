'use strict';

import _ from 'lodash';
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

class Feedback {
    sendFeedback(req, callback){
        //send email to livejam team
        let mailOptions = {
                    from: 'youfmorg@gmail.com', // sender address
                    to: 'youfmorg@gmail.com', // list of receivers
                    subject: 'Feedback from user '+req.body.email, // Subject line
                    text: 'Hello LiveJam Team,' +req.body.feedback, // plain text body
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                    callback(null, {});
                });
    }
}
export default Feedback;