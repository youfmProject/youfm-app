'use strict';

import AlbumModel from '../models/Albums';

const callback = (method, response) => {
    return (err, res) => {
        return response.status(200).json(res);
    };
};


module.exports = {
    getAlbums: (req, res, next) => {
        let Albums = new AlbumModel();
        console.log('hit Albums');
        Albums.getAlbums(req, callback('GET', res));
    }
}