'use strict';

import _ from 'lodash';
import async from 'async';
import youtubeSearch from 'youtube-search';
import constants from '../lib/constants';

class youtube {

	constructor(){
		/*Can set context here*/
	}

    searchYoutube(req, callback) {
    	var opts = {
		  maxResults: 10,
		  key: constants.youtubeAPIKey
		};
		youtubeSearch('deadmau5', opts, function(err, results) {
		  if(err) return console.log(err);
		  console.dir(results);
		  callback(null, results);
		});
    }
}

export default youtube;