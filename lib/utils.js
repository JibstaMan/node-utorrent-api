var Torrent = require('./torrent');

var utils = {

    toTorrents: function(torrents, options) {
        var newList = [];
        for (var i = 0; i < torrents.length; i++) {
            var torrent = new Torrent(torrents[i]);

            var add = true;
            if (typeof options === 'object') {
                if (options.skipCompleted === true && torrent.progress === 100) {
                    add = false;
                }
            }

            if (add) {
                newList.push(torrent);
            }
        }
        return newList;
    },

    toLabels: function(labels) {
        return labels;
    }

};
module.exports = utils;