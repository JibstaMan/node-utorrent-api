/**
 * uTorrent has a token system which requires each request to have a token.
 * It's possible that the token becomes invalid, which will result in a
 * request failing. In those cases, we need to fetch the token again and
 * retry the previous request.
 * https://github.com/bittorrent/webui/wiki/TokenSystem
 *
 * The Web API also allows for arrays in a bit of a strange matter:
 * ?action=stop&hash=[hash1]&hash=[hash2]&...
 * ?action=setsetting&s=max_ul_rate&v=10&s=max_dl_rate&v=40
 */

var request = require('request');
var util = require('util');

module.exports = (function () {

    var rootUrl = null;
    var username = null;
    var password = null;
    var token = null;
    var cookies = request.jar();

    var setCredentials = function (user, pass) {
        username = user || null;
        password = pass || null;
    };

    var fetchToken = function (callback) {

        makeRequest({path: '/token.html'}, function (err, body) {
            if (err) {
                return callback(err);
            }

            // body contains a single div like:
            // <div id="token" style="display: none;">[token value]</div>

            // we first make sure the div has indeed the id="token" part
            // we then capture the token.
            var regex = new RegExp('<div id=(?:\'|")token(?:\'|")[^>]+>(.*)</div>');
            var matches = regex.exec(body);

            if (matches != null && matches.length > 1) {
                token = matches[1];
                callback(null);
            } else {
                callback('Cannot find token in response body.');
            }
        });
    };

    var retrieveTorrent = function(uri, callback)
    {
        request({
            uri: uri,
            encoding: null
        }, function(err, resp, torrentFileBuffer)
        {
            callback(err, torrentFileBuffer);
        })
    };

    var callTorrent = function (action, hash, callback) {
        var params = "";

        if (Object.prototype.toString.call(hash) === '[object Array]') {
            for (var i = 0; i < hash.length; i++) {
                params += "&hash=" + hash[i];
            }
        }
        else if (typeof hash === 'string') {
            params = {hash: hash};
        }

        call(action, params, callback);
    };

    var call = function (action, params, callback) {
        // If no params was passed
        if (typeof params == 'function') {
            callback = params;
            params = {};
        }

        // Callback used when we call the makeCall() method for first time with a saved token.
        // As the token may have expired, we need to check this and retry with new token if an error occurs.
        var retryCallback = function (err, data) {
            if (err && err instanceof TokenError) {
                console.log("Fetching new token.");
                fetchToken(function (err) {
                    if (err) {
                        return callback(err);
                    }

                    makeCall(action, params, callback);
                });
            } else {
                callback(err, data);
            }
        };

        // Token may expire, so even if it is set, we must try again if an error occurs when requesting the method for first time
        if (token != null) {
            makeCall(action, params, retryCallback);
        } else {
            fetchToken(function (err) {
                if (err) {
                    return callback(err);
                }

                makeCall(action, params, callback);
            });
        }
    };

    var makeCall = function (action, params, callback) {
        var options = {
            'method': 'GET',
            'qs': ""
        };

        if (action == 'list') {
            options.qs = "?list=1&token=" + token;
        }
        else {
            options.qs = "?action=" + action + "&token=" + token;
        }

        // POST action
        if (action == 'add-file') {
            options.form = params;
        }
        else // GET actions
        {
            if (typeof params == 'object') {
                var p = "";
                for (var key in params) {
                    p += "&" + key + "=" + params[key];
                }
                params = p;
            }

            if (typeof params == 'string') {
                if (params.substr(0, 1) !== "&") {
                    options.qs += "&";
                }
                options.qs += params;
            }
        }

        //options.qs.token = token;
        console.log("Query string options: ", options.qs);

        makeRequest(options, function (err, body) {
            if (err) {
                return callback(err, null);
            }

            callback(null, JSON.parse(body));
        });
    };

    var makeRequest = function (options, callback) {
        var reqOptions = {
            'method': options.method || 'GET',
            'uri': (options.path) ? rootUrl + options.path : rootUrl + '/',
            'auth': {
                'user': username,
                'pass': password,
                'sendImmediately': false
            },
            'jar': cookies
        };

        if ('qs' in options) {
            reqOptions.uri += options.qs;
        }

        if ('form' in options) {
            // TODO: check why sometimes uTorrent returns error "Can\'t add torrent: torrent is not valid bencoding" when adding torrent. Error by our side, or malformed torrent file ?
            reqOptions.multipart = [
                {
                    'Content-Disposition': 'form-data; name="torrent_file"; filename="torrent_file.torrent"',
                    /*'Content-Transfer-Encoding': 'binary',*/
                    'Content-Type': 'application/x-bittorrent',
                    'body': options.form.torrent_file
                },
                {'body': options.form.torrent_file}
            ];

            reqOptions.headers = {
                'content-type': 'multipart/form-data'
            };

            reqOptions.method = 'POST';
        }

        // Send the request
        request(reqOptions, function (err, res, body) {
            if (err) {
                if ('code' in err && err.code == 'ECONNREFUSED') {
                    callback(new Error('uTorrent not running...'));
                } else {
                    callback(err);
                }

            } else if (typeof body == 'object' && 'error' in body) {
                callback(new Error(body.error));

            } else if (res.statusCode != 200) {
                if (res.statusCode == 401) {
                    callback(new AuthError('Bad username or password.'));
                } else if (res.statusCode == 400) {
                    console.log("400: ", err, res, body);
                    callback(new TokenError('uTorrent API returned status code : 400'));
                } else {
                    callback(new Error('uTorrent API returned status code : ' + res.statusCode));
                }

            } else {
                callback(null, body);
            }
        });
    };

    return {

        setOptions: function (host, port, user, pass) {
            rootUrl = 'http://' + host + ':' + port + "/gui";
            setCredentials(user, pass);
        },

        setCredentials: setCredentials,
        retrieveTorrent: retrieveTorrent,
        callTorrent: callTorrent,
        call: call,
        makeCall: makeCall,
        makeRequest: makeRequest
    }
})();

/* Custom error objects */
var AbstractError = function (msg, constr) {
    Error.captureStackTrace(this, constr || this);
    this.message = msg || 'Error'
};
util.inherits(AbstractError, Error);
AbstractError.prototype.name = 'Abstract Error';

var TokenError = function (msg) {
    TokenError.super_.call(this, msg, this.constructor)
};
util.inherits(TokenError, AbstractError);
TokenError.prototype.message = 'Token Error';

var AuthError = function (msg) {
    TokenError.super_.call(this, msg, this.constructor)
};
util.inherits(AuthError, AbstractError);
AuthError.prototype.message = 'Authentication Error';