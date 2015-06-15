'use strict';

var EventEmitter = require('events').EventEmitter;
var React = require('react');
var HikeWeather = require('./../../components/hike/Weather');

var HikePreview = React.createClass({
	displayName:'HikePreview',
	render: function () {
		var hike = this.props.hike;
		var weather = hike.weather;
		var weatherMarkup;

		if (weather) {
			weatherMarkup = React.createElement(HikeWeather, {weather: weather})
		}

		return (
			React.createElement("li", {className: "hike"}, 
				React.createElement("h3", {className: "hike-title"}, 
					React.createElement("a", {href: hike.url, target: "_BLANK"}, hike.title)
				), 
				React.createElement("img", {src: hike.image, className: "hike-image"}), 
				weatherMarkup
			)
		);
	}
});

module.exports = HikePreview;