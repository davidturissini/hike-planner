'use strict';

var request = require('request');
var Promise = require('bluebird');

module.exports = {

	key:'c8871b721284bcd319b2974a901932ec',

	get: function (options) {
		options = options || {};

		return new Promise(function (resolve, reject) {
			request({
				url:'http://api.openweathermap.org/data/2.5/station/find',
				qs:options
			}, function (err, resoonse, body) {
				var json = JSON.parse(body);
				resolve(json);
			});

		});
	},

	findWeatherStationsInBounds: function (latLngBounds) {
		return new Promise(function (resolve, reject) {
			request({
				url:'http://api.openweathermap.org/data/2.5/box/station',
				qs:{
					bbox:latLngBounds.toBBOX()
				}
			}, function (err, resoonse, body) {
				var json = JSON.parse(body);
				resolve(json);
			});

		});
	},

	findWeatherStationsNearLatLng: function (latLng) {
		var key = this.key;

		return new Promise(function (resolve, reject) {
			request({
				url:'http://api.openweathermap.org/data/2.5/station/find',
				qs:{
					lat:latLng.lat,
					lon:latLng.lon
				},
				headers: {
					'x-api-key':key
				}
			}, function (err, resoonse, body) {
				var json = JSON.parse(body);
				resolve(json);
			});

		});
	}

};