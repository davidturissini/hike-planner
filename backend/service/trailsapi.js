'use strict';

var request = require('request');
var Promise = require('bluebird');

/*

trailsapi.get({
	lat:38.923533,
	lon:-120.019748,
	radius:100,
	limit:50
})
.then(function (response) {
	var trails = response.places;
	trails.forEach(function (trail) {
		console.log(trail.name, trail.activities.length);
		console.log(trail.activities);
		console.log(trail.city + ', ' + trail.state);
		console.log('------');

	})
});
*/

var trailsAPI = {

	key:'LDSFX8JwcjmshVhh7tDdnkVEJ53kp1frNwxjsnrILLLRqquF11',

	get: function (options) {
		var key = this.key;
		options = options || {};

		if (!options.q) {
			options.q = {};
		}

		options.q['activities_activity_type_name_eq'] = 'hiking';

		return new Promise(function (resolve, reject) {
			request({
				url:'https://trailapi-trailapi.p.mashape.com',
				qs:options || {},
				headers: {
					'X-Mashape-Key': key
				}
			}, function (err, resoonse, body) {
				resolve(JSON.parse(body));
			});

		});

	}

};


module.exports = trailsAPI;