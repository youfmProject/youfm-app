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
		var options = {
			maxResults: 15,
			key: constants.youtubeAPIKey
		},
		keyword = _.get(req, 'query.search','');
		keyword = keyword + ' lyrics';
		youtubeSearch(keyword, options, function(err, results) {
			if(err) return callback(null, []);
			var songs =[];
			_.forEach(results, function(result){
				songs.push({
					id: result.id,
					name: result.title,
					image: _.get(result, 'thumbnails.medium.url', '')
				});
			});
			callback(null, songs);
		});
	}
}

export default youtube;