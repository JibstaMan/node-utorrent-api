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
utorrent.list(function(err, torrentList) {
	if (err) { return console.log(err); }

	console.log(torrentList);

	utorrent.list(torrntList.torrentc, function(err, changedList) {
		if (err) { return console.log(err); }

		console.log(changedList);
	});
});
```

### utorrent.callTorrent(action, hash, callback)

Alias for utorrent.call(action, {hash: hash}, callback); This function can be used to perform actions on a single torrent using its hash.

### utorrent.call(action, [params], callback)

Low level function for direct communication with the API. The raw response from the API will be returned.

Call the specified API action. If the action do not require params (like 'list'), this argument can be ignored.

If you want to use the 'add-file' method, just specify a 'torrent_file' param with a buffer containing the torrent file to upload to the API.

Return an error to the callback (if one appeared) and an object containing the result sent back by the API.

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

var utorrent = new Client('localhost', '22222');
utorrent.setCredentials('admin', '123456');

utorrent.call('list', function(err, torrents_list) {
	if(err) { console.log(err); return; }

	console.log(torrents_list);
});
```

### Add torrent file

```javascript
var request = require('request');
var Client = require('utorrent-api');
var fs = require('fs');

var utorrent = new Client('localhost', '22222');
utorrent.setCredentials('admin', '123456');

request({'uri' : 'http://releases.ubuntu.com/13.04/ubuntu-13.04-desktop-i386.iso.torrent', 'encoding': null}, function (error, response, torrentFileBuffer) {
	utorrent.call('add-file', {'torrent_file': torrentFileBuffer}, function(err, data) {
		if(err) { console.log('error : '); console.log(err); return; }

		console.log('Successfully added torrent file !');
		console.log(data);
	});
});
```

### Get torrent details

```javascript
var Client = require('utorrent-api');
var fs = require('fs');

var utorrent = new Client('localhost', '22222');
utorrent.setCredentials('admin', '123456');

utorrent.call('getprops', {'hash': 'daac7008e2e3a6e4321950c131690aca20c5a08a'}, function(err, data) {
	if(err) { console.log('error : '); console.log(err); return; }

	console.log(data);
});
```

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/leeroybrun/node-utorrent-api/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
