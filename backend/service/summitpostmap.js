'use strict';

var request = require('request');
var Promise = require('bluebird');

var trailsAPI = {

	get: function (data) {
		data = data || {};

		return new Promise(function (resolve, reject) {
			request({
				url:'http://summitpostmap.herokuapp.com/summits',
				qs:data
			}, function (err, resoonse, body) {
				var json = JSON.parse(body);

				var hikes = json.map(function (hikeJSON) {

					return {
						id:hikeJSON._id,
						title:hikeJSON.title,
						image:hikeJSON.image,
						elevation:hikeJSON.elevation,
						url:hikeJSON.url,
						coordinate: {
							latitude:hikeJSON.latitude,
							longitude:hikeJSON.longitude
						},
						attribution: {
							source:'summitpost',
							url:'http://www.summitpost.com',
							image:null
						}
					}

				});

				resolve(hikes);
			});

		});

	},

	queryRegion: function (latLngRegion) {

		var data = {
			bounds:{
				sw:{
					latitude:latLngRegion.sw.lat,
					longitude:latLngRegion.sw.lon
				},
				ne: {
					latitude:latLngRegion.ne.lat,
					longitude:latLngRegion.ne.lon
				}
			}
		};

		return this.get(data);
	}

};


module.exports = trailsAPI;