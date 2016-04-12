const xhr = require('xhr');
const httperr = require('httperr');

const BaseApi = function(options) {
	options = options || {};

	const baseUrl = options.baseUrl,
		wrapCallback = function(callback) {
			return function xhrHandler(err, response, body) {
				if (err) {
					return callback(err);
				}
				if (response.statusCode >= 400) {
					return callback(httperr[response.statusCode](body.message));
				}
				if (response.statusCode === 201) {
					return callback(null, response.headers.location);
				}
				callback(null, body);
			};
		};


	this.get = function(path, token, callback) {
		if (!token) {
			return setTimeout(callback.bind(null, new Error('Not Authenticated')), 1);
		}
		xhr({
			url: baseUrl + path,
			method: 'GET',
			json: true,
			headers: {
				Authorization: 'Bearer ' + token
			}
		}, wrapCallback(callback));
	};

	this.post = function(path, data, token, callback) {
		if (!token) {
			return setTimeout(callback.bind(null, new Error('Not Authenticated')), 1);
		}
		xhr({
			url: baseUrl + path,
			method: 'POST',
			json: data,
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json; charset=UTF-8'
			}
		}, wrapCallback(callback));
	};

	this.put = function(path, data, token, callback) {
		if (!token) {
			return setTimeout(callback.bind(null, new Error('Not Authenticated')), 1);
		}
		delete data._meta;
		xhr({
			url: baseUrl + path,
			method: 'PUT',
			json: data,
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json; charset=UTF-8'
			}
		}, wrapCallback(callback));
	};

	this.del = function(path, token, callback) {
		if (!token) {
			return setTimeout(callback.bind(null, new Error('Not Authenticated')), 1);
		}
		xhr({
			url: baseUrl + path,
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + token
			}
		}, wrapCallback(callback));
	};
};

module.exports = BaseApi;