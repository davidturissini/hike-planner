'use strict';

var express = require('express');
var port = process.env.PORT || 3300;
var trailsapi = require('./service/trailsapi');
var summitpostmap = require('./service/summitpostmap');
var weather = require('./service/weather');
var LatLngCoord = require('./model/LatLngCoord');
var LatLngRegion = require('./model/LatLngRegion');
var NOAARequest = require('./service/NOAARequest');
var NOAAWeatherResponse = require('./model/NOAAResponse');
var noaa = require('./service/noaa');
var app = express();
var _ = require('lodash');

app.use(express.static('www/public'));

app.get('/weather', function (req, res) {
	var points = req.query.points;

	var request = new NOAARequest('NDFDgenLatLonList', {
		listLatLon:points.join(' '),
		product:'time-series'
	});

	request.send()
		.then(function (result) {
			var noaaResponse = new NOAAWeatherResponse(result.data[0]);
			var weatherReports = noaaResponse.generateReports([
				'probability-of-precipitation',
				'precipitation',
				'temperature',
				'cloud-amount',
				'humidity',
				'fire-weather',
				'direction',
				'wind-speed'
			]);

			
			res.write(JSON.stringify(weatherReports));
			res.end();
		});

});

app.get('/hikes', function (req, res) {
	var queryBounds = req.query.bounds;
	var region = LatLngRegion.createFromURLParams(queryBounds);

	summitpostmap.queryRegion(region).then(function (hikes) {
		
		res.write(JSON.stringify(hikes));
		res.end();
		
	});
	
});

app.listen(port);
console.log('App started on port ' + port);


