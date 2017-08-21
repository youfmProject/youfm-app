'use strict';

import _ from 'lodash';
import async from 'async';
import constants from '../lib/constants';
import request from 'request';
var reddit = require('../lib/redditHelper');

class Reddit {

	constructor(){
		/*Can set context here*/
	}

	getRedditTracks(req, callback) {
        var subReddit = _.get(req, 'query.subReddit', 'Music');
        request({
            uri: 'https://www.reddit.com/r/'+subReddit+'.json',
            json: true
        }, function(err, res){
            if(!err && res.statusCode === 200){
                var tracks = _.get(res, 'body.data.children', []);
                var popularSongs = reddit(tracks);
                return callback(null, popularSongs);
            }
            console.log("Error in subreddit");
            callback(true, []);
        });
	}
}

export default Reddit;