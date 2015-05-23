var request = require('./request');
var utils = require('./utils');

var uTorrentClient = function (host, port, user, pass) {
    request.setOptions(host, port, user, pass);

    this.setCredentials = function (user, pass) {
        request.setCredentials(user, pass);
    };

    this.list = function (cacheID, callback) {
        if (typeof cacheID == 'function') {
            callback = cacheID;
            cacheID = null;
        }

        var params = {};
        if (cacheID) {
            params.cid = cacheID;
        }

        this.call('list', params, function (err, torrentList) {
            if (err) {
                return callback(err);
            }

            // when cacheID has been set, torrentList doesn't contain a
            // list of torrents, but a list of torrents that have changed
            // since the cached request. This means we need to parse a
            // different list, called torrentp.

            var torrents = (cacheID) ? torrentList.torrentp : torrentList.torrents;

            // TODO rssfeed(s|m|p) & rssfilter(s|m|p)
            var torrentsObject = {
                build: torrentList.build,
                cacheID: torrentList.torrentc,
                torrents: utils.toTorrents(torrents),
                labels: utils.toLabels(torrentList.label)
            };

            if (cacheID) {
                torrentsObject.removedTorrents = torrentList.torrentm;
            }

            callback(null, torrentsObject);
        });
    };

    this.setSettings = function (params, callback) {
        var qs = "";
        for (var key in params) {
            qs += "&s=" + key + "&v=" + params[key];
        }

        this.call('setsetting', qs, callback);
    };

    this.call = function () {
        request.call.apply(request, arguments);
    };

    this.callTorrent = function () {
        request.call.apply(request, arguments);
    }
};
module.exports = uTorrentClient;