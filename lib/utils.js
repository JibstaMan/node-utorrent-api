var Torrent = require('./torrent');

var utils = {

    toTorrents: function(torrents) {
        var newList = [];
        for (var i = 0; i < torrents.length; i++) {
            newList.push(new Torrent(torrents[i]));
        }
        return newList;
    },

    toLabels: function(labels) {
        return labels;
    }

};
module.exports = utils;