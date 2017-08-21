module.exports = function(tracks){
    var data = tracks.map(function (post) {
        var parsedTitle = post.data.title.match(/^(.+) - (.+) \[(.+)\]/);
            if (!parsedTitle) {
                return false;
            }
            return {
                songId: post.data.id,
                name: parsedTitle[2],
                artist: parsedTitle[1],
                image: "http://img.youtube.com/vi/"+ post.data.url.split('=')[1] + "/0.jpg",
                url: post.data.url
            }
            }).filter(function (track) {
                return track;
            });
    return data;
};