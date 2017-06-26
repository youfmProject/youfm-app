'use strict';

import _ from 'lodash';
import async from 'async';
import spotifyClient from 'spotify-web-api-node';
import billboardClient from 'billboard-hot-100';

class Albums {
    getAlbums(req, callback){
        callback(null, {});
    }
}

export default Albums;