import xhr from 'xhr';
import httperr from 'httperr';

export default class TokenService {
	constructor(options) {
		this.baseUrl = options.baseUrl;
	}
	
	getToken(userName, password, callback) {
		xhr({
			url: this.baseUrl + '/token',
			method: 'POST',
			body: `grant_type=password&username=${userName}&password=${password}`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}, function(err, response, body) {
			if (err) {
				return callback(err);
			}
			let result = null;
			try {
				result = JSON.parse(body);
			}
			catch (ex) {
				console.error(ex);
				result = {};
			}
			if (response.statusCode >= 400) {
				return callback(httperr[response.statusCode](result.error_description));
			}
			callback(null, result);
		});
	}
}