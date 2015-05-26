var Client = require('../lib/utorrent');
var fs = require('fs');

var utorrent = new Client('localhost', '22222');
utorrent.setCredentials('admin', '123456');

var uri = 'http://releases.ubuntu.com/13.04/ubuntu-13.04-desktop-i386.iso.torrent';
utorrent.addFile(uri, function(err, data) {
	if(err) {
		console.log('error : ');
		console.log(err);
		return;
	}

	console.log('Successfully added torrent file!');
	console.log(data);
	// data = { build: 40298 }
});