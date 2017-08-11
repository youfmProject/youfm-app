'use strict';

import playlistModel from '../models/Playlist';

const callback = (method, response) => {
    return (err, res) => {
         if(err) {
            return response.status(500).json(err);
        }
        return response.status(200).json(res);
    };
};


module.exports = {
    updatePlaylist: (req, res, next) => {
        let playlist = new playlistModel();
        playlist.updatePlaylist(req, callback('POST', res));
    }
}