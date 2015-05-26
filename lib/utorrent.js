var request = require('./request');
var utils = require('./utils');

var uTorrentClient = function (host, port, user, pass) {
    request.setOptions(host, port, user, pass);

    this.setCredentials = function (user, pass) {
        request.setCredentials(user, pass);
    };

    this.list = function (options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }

        var params = {};
        if (typeof options === 'string') {
            params.cid = options;
        } else if (typeof options === 'object') {
            if ('cacheID' in options) {
                params.cid = options.cacheID;
            }
        }

        this.call('list', params, function (err, torrentList) {
            if (err) {
                return callback(err);
            }

            // when cacheID has been set, torrentList doesn't contain a
            // list of torrents, but a list of torrents that have changed
            // since the cached request. This means we need to parse a
            // different list, called torrentp.

            var torrents = (params.cid) ? torrentList.torrentp : torrentList.torrents;

            // TODO rssfeed(s|m|p) & rssfilter(s|m|p)
            var torrentsObject = {
                build: torrentList.build,
                cacheID: torrentList.torrentc,
                torrents: utils.toTorrents(torrents, options),
                labels: utils.toLabels(torrentList.label)
            };

            if (params.cid) {
                torrentsObject.removedTorrents = torrentList.torrentm;
            }

            callback(null, torrentsObject);
        });
    };

    this.add = function(url, callback)
    {
        if (url.substr(0, 7) === "magnet:")
        {
            this.addUrl(url, callback);
        }
        else if (url.substr(-8) === ".torrent")
        {
            this.addFile(url, callback);
        }
    };

    this.addUrl = function(url, callback)
    {
        this.call('add-url', { s: url }, callback);
    };

    this.addFile = function(uri, callback)
    {
        var self = this;
        request.retrieveTorrent(uri, function(err, torrentFileBuffer)
        {
            self.call('add-file', {
                'torrent_file': torrentFileBuffer
            }, callback);
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