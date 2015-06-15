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
			weatherMarkup = <HikeWeather weather={weather} />
		}

		return (
			<li className="hike">
				<h3 className="hike-title">
					<a href={hike.url} target="_BLANK">{hike.title}</a>
				</h3>
				<img src={hike.image} className="hike-image" />
				{weatherMarkup}
			</li>
		);
	}
});

module.exports = HikePreview;