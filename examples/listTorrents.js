var utorrentClient = require('../lib/utorrent');

var utorrent = new utorrentClient('localhost', '22222');
utorrent.setCredentials('admin', '123456');

// retrieve all torrents.
utorrent.list(function(err, torrentsList) {
	if(err) {
		return console.log(err);
	}

	console.log(torrentsList);

	// retrieve all torrents that have been updated since our last call.
	utorrent.list(torrentsList.cacheID, function(err, changedList)
	{
		if (err) {
			return console.log(err);
		}

		console.log(changedList);
	});
});