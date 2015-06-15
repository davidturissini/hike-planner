'use strict';


function LatLngCoord (lat, lon) {
	this.lat = parseFloat(lat);
	this.lon = parseFloat(lon);
};

var proto = LatLngCoord.prototype;

proto.clone = function () {
	return new LatLngCoord(this.lat, this.lon);
};

module.exports = LatLngCoord;