'use strict';

var EventEmitter = require('events').EventEmitter;


var hikePrototype = Object.create(EventEmitter.prototype, {
	weather: {
		set: function (w) {
			this._weather = w;
			this.emit('weather');
		},

		get: function () {
			return this._weather;
		}
	}
});


module.exports = {

	create: function (attrs) {
		var hike = Object.create(hikePrototype);

		hike.coordinate = attrs.coordinate;
		hike.title = attrs.title;
		hike.image = attrs.image;
		hike.id = attrs.id;
		hike.url = attrs.url;

		return hike;
	}

};