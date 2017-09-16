'use strict';

import feedbackModel from '../models/Feedback';

const callback = (method, response) => {
    return (err, res) => {
         if(err) {
            return response.status(500).json(err);
        }
        return response.status(200).json(res);
    };
};


module.exports = {
    sendFeedback: (req, res, next) => {
        let feedback = new feedbackModel();
        feedback.sendFeedback(req, callback('POST', res));
    }
}