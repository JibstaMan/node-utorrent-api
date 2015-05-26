# node-utorrent-api

[![NPM](https://nodei.co/npm/utorrent-api.png)](https://nodei.co/npm/utorrent-api/)

Node.js wrapper around the uTorrent Web API.

## Basic Usage

Here is the basic usage of this module.
You can find an advanded list of methods supported by uTorrent Web UI API [on their website](http://www.utorrent.com/intl/en/community/developers/webapi#devs2).

First you need to instantiate a new client object, and then set the credentials used to connect to the uTorrent Web UI.

Then you can do your calls to the API.

## Setup
You can easily create a new client to the API:
```javascript
var Client = require('utorrent-api');

var utorrent = new Client('localhost', '22222');
utorrent.setCredentials('admin', '123456');
```

There's also a shorthand for this, in case you have all the information from the start:
```javascript
var Client = require('utorrent-api');

var utorrent = new Client('localhost', '22222', 'admin', '123456');
```

## uTorrent methods

Here are the available methods :

### new require('utorrent-api')(host, port, [username], [password])

Creates a new client to the uTorrent Web API. Use `setCredentials` when the username and password aren't known at time of creation.

### utorrent.setCredentials(username, password)

Set the credentials used to access the uTorrent Web UI.

### utorrent.list([cacheID], callback)

Retrieves the list of torrents. The torrents will be automatically parsed into objects with proper variable names.

```javascript
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
```

### utorrent.callTorrent(action, hash, callback)

Alias for `utorrent.call(action, {hash: hash}, callback);`. This function can be used to perform actions on a single
torrent using its hash. It's also possible to supply a hash array to perform the action against multiple torrents.

### utorrent.call(action, [params], callback)

Low level function for direct communication with the API. The raw response from the API will be returned.

Call the specified API action. If the action does not require params (like 'list'), this argument can be ignored.

Returns an error to the callback (if one appeared) and an object containing the result sent back by the API.

## Torrent methods

The `utorrent.list` function returns a list of `Torrent`s. Those torrents themselves have the following methods:
* `torrent.start(callback)` - Start the torrent
* `torrent.stop(callback)` - Stop the torrent
* `torrent.pause(callback)` - Pause the torrent
* `torrent.forceStart(callback)` - Force the torrent to start.
* `torrent.unpause(callback)` - Unpause the torrent.
* `torrent.recheck(callback)` - Recheck the content of the torrent.
* `torrent.remove(callback)` - Remove the torrent from the list, moving the .torrent file to trash if possible.
* `torrent.removeData(callback)` - Remove the torrent and its data, moving everyhing to trash if possible.
* `torrent.setPriority(priority, fileIndex, callback)` - Set the priority for the torrent.

**Callback**

`callback(err, data)` where data is an `object` with the `build` number. You're fine by just checking for the error.

**Priority**
* 0 = Don't download
* 1 = Low priority
* 2 = Normal priority
* 3 = High priority

## Examples

### Request the torrents list

```javascript
var Client = require('utorrent-api');

var utorrent = new Client('localhost', '22222', 'admin', '123456');

utorrent.call('list', function(err, torrents_list) {
	if(err) { console.log(err); return; }

	console.log(torrents_list);
});
```

### Add torrent

**Add torrent file**
```javascript
var Client = require('utorrent-api');
var fs = require('fs');

var utorrent = new Client('localhost', '22222', 'admin', '123456');

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
```

**Add torrent URL**
```javascript
// initialization

var url = 'magnet:?xt=urn:btih:fc8a15a2faf2734dbb1dc5f7afdc5c9beaeb1f59&dn=Ubuntu%2015.04%20Desktop%20Amd64%2C%20%5BIso%20-%20MultiLang%5D%20%5B%20%5D&tr=udp%3A%2F%2Ftracker.openbittorrent.com&tr=udp%3A%2F%2Ftracker.publicbt.com';
utorrent.addUrl(uri, function(err, data) {
	// same callback
});
```

**Add torrent**

For convenience, you can also use `utorrent.add`:

```javascript
// initialization

// using the torrent file uri
utorrent.addUrl(uri, function(err, data) {
	// same callback
});
// now using the magnet link
utorrent.addUrl(url); // you can omit the callback at your own risk.
```

### Get torrent details

```javascript
var Client = require('utorrent-api');
var fs = require('fs');

var utorrent = new Client('localhost', '22222', 'admin', '123456');

utorrent.call('getprops', {'hash': 'daac7008e2e3a6e4321950c131690aca20c5a08a'}, function(err, data) {
	if(err) { console.log('error : '); console.log(err); return; }

	console.log(data);
});
```

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/leeroybrun/node-utorrent-api/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
