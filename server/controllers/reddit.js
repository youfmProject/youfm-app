'use strict';

import redditModel from '../models/Reddit';
import _ from 'lodash';

const callback = (method, response) => {
    return (err, res) => {
        if(err) {
            return response.status(500).json(err);
        }
        return response.status(200).json(res);
    };
};


module.exports = {
    getRedditTracks: (req, res, next) => {
        let reddit = new redditModel();
        reddit.getRedditTracks(req, callback('GET', res));
    }
}