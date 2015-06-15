'use strict';

var openweathermap = require('./openweathermap');
var noaa = require('./noaa');

module.exports = {

	findWeatherStationsNearLatLng: function (latLng) {
		return noaa.findWeatherStationsInRegion(latLng);
	},

	getWeatherForLatLngRegion: function (geoRegion) {
		

		return noaa.findWeatherStationsInRegion(geoRegion);
	}

};