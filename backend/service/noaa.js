'use strict';

//http://www.ncdc.noaa.gov/cdo-web/webservices/v2

var LatLngCoord = require('./../model/LatLngCoord');
var NOAARequest = require('./NOAARequest');

module.exports = {

	key:'bbTXxeMFlILfBZNoqrvYYaxRPOUVaefD',

	findWeatherStationsInRegion: function (region) {
		var key = this.key;
		var url = 'http://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php?wsdl';
		var center = region.getCenter();

		var data = {
			centerPointLat:center.lat,
			centerPointLon:center.lon,
			distanceLat:region.getLatitudeDistanceToCenter(),
			distanceLon:region.getLongitudeDistanceToCenter(),
			resolution:10
		};

		var lastLonListSquareRequest = new NOAARequest('LatLonListSquare', data);

		return lastLonListSquareRequest.send()
			.then(function (e) {
				var latLonList = e.latLonList[0];
				
				var latLonListRequest = new NOAARequest('NDFDgenLatLonList', {
					listLatLon:latLonList,
					product:'time-series'
				});

				return latLonListRequest.send();

			})
			.then(function (e) {
				var locations = {};

				for(var i = 0; i < e.data.length; i += 1) {
					e.data[i].location.forEach(function (loc) {
						var locationId = loc['location-key'][0];
						var pointData = loc['point'][0].$;
						var latitude = pointData.latitude;
						var longitude = pointData.longitude;

						locations[locationId] = {
							coord:new LatLngCoord(latitude, longitude)
						};
					});
				}


				return locations;

			});

	}

};