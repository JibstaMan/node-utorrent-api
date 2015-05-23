var request = require('./request');

var statusKeys = [
    'Started',
    'Checking',
    'Start after check',
    'Checked',
    'Error',
    'Paused',
    'Queued',
    'Loaded'
];

var statusValues = [1, 2, 4, 8, 16, 32, 64, 128];

function convertStatus(number) {

    var statusArray = [];
    for (var i = statusValues.length - 1; i > 0; i--) {
        if (number > statusValues[i]) {
            number -= statusValues[i];
            statusArray.push(statusKeys[i]);
            if (number == 0) {
                break;
            }
        }
    }
    return statusArray;
}

/**
 *
 * @param data The data array received from uTorrent Web API
 * @constructor
 */
var Torrent = function (data) {

    this.hash = data[0];
    this.status = data[1];
    this.statusArray = convertStatus(this.status);
    this.name = data[2];
    this.size = data[3];           // bytes
    this.progress = data[4];       // percentage in per mils (1000 = 100.0%)
    this.downloaded = data[5];     // bytes
    this.uploaded = data[6];       // bytes
    this.ratio = data[7];          // percentage in per mils (1000 = 1.000)
    this.uploadSpeed = data[8];    // bytes per second
    this.downloadSpeed = data[9];  // bytes per second
    this.eta = data[10];           // seconds
    this.label = data[11];
    this.connectedPeers = data[12];
    this.swarmPeers = data[13];
    this.connectedSeeds = data[14];
    this.swarmSeeds = data[15];
    this.availability = data[16];  // 1/65535ths
    this.queueOrder = data[17];
    this.remaining = data[18];
    // Not sure what the rest of the values are.
    this.path = data[26];
    
};

Torrent.prototype.start = function (callback) {
    request.callTorrent('start', this.hash, callback);
};

Torrent.prototype.stop = function (callback) {
    request.callTorrent('stop', this.hash, callback);
};

Torrent.prototype.pause = function (callback) {
    request.callTorrent('pause', this.hash, callback);
};

Torrent.prototype.forceStart = function (callback) {
    request.callTorrent('forcestart', this.hash, callback);
};

Torrent.prototype.unpause = function (callback) {
    request.callTorrent('unpause', this.hash, callback);
};

Torrent.prototype.recheck = function (callback) {
    request.callTorrent('recheck', this.hash, callback);
};

Torrent.prototype.remove = function (callback) {
    request.callTorrent('remove', this.hash, callback);
};

Torrent.prototype.removeData = function (callback) {
    request.callTorrent('removedata', this.hash, callback);
};

Torrent.prototype.setPriority = function (priority, fileIndex, callback) {
    
    
};

module.exports = Torrent;

