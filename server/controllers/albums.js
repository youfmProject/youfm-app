'use strict';

import Albums from '../models/Albums';

const callback = (method, response) => {
    return (err, res) => {
        return response.status(200).json(res);
    };
};


module.exports = {
    getAlbums: (req, res, next) => {
        console.log("SHreyas");
        let Albums = new Albums();
        Albums.getAlbums(req, callback('GET', res));
    }
}