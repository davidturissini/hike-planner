'use strict';

var jquery = require('jquery');
var weather = require('./../model/weather');

function WeatherQuery (params) {
    this.params = params || {};
};

var proto = WeatherQuery.prototype;

proto.send =  function () {

    return jquery.ajax({
        url:'/weather',
        dataType:'json',
        data: this.params
    }).then(function (e) {
    	return e.map(function (weatherData) {
    		return weather.create(weatherData);
    	});
    });

};


WeatherQuery.queryHikes = function (hikes) {
	var latLngs = hikes.map(function (hike) {
	    return hike.coordinate.latitude + ',' + hike.coordinate.longitude;
	});

	var query = new WeatherQuery({
	    points:latLngs
	});

	return query.send();
};


module.exports = WeatherQuery;