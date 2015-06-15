'use strict';

var LatLngCoord = require('./LatLngCoord');

function LatLngRegion (latLng) {
	this.sw;
	this.ne;

	if (latLng) {
		this._handleLatLngAdd(latLng);
	}
};

var proto = LatLngRegion.prototype;

proto.containsLatLng = function (latLng) {
	return (
		latLng.lon > this.sw.lon &&
		latLng.lat > this.sw.lat &&
		latLng.lon < this.ne.lon &&
		latLng.lat < this.ne.lat
		);
};

proto._handleLatLngAdd = function (latLng) {
	if (!this.sw && !this.ne) {
		this.sw = latLng.clone();
		this.ne = latLng.clone();
		return;
	}

	if (latLng.lon < this.sw.lon) {
		this.sw.lon = latLng.lon;
	}

	if (latLng.lat < this.sw.lat) {
		this.sw.lat = latLng.lat;
	}

	if (latLng.lon > this.ne.lon) {
		this.ne.lon = latLng.lon;
	}

	if (latLng.lat > this.ne.lat) {
		this.ne.lat = latLng.lat;
	}

};

proto.getNorthEast = function () {
	return this.ne;
};

proto.getSouthWest = function () {
	return this.sw;
};

proto.addLatLng = function (latLng) {
	this._handleLatLngAdd(latLng);
};

proto.getCenter = function () {
	var centerLat = this.sw.lat + ((this.ne.lat - this.sw.lat) / 2);
	var centerLon = this.ne.lon + ((this.sw.lon - this.ne.lon) / 2);

	return new LatLngCoord(centerLat, centerLon);
};

proto.getLongitudeWidth = function () {
	return this.ne.lon - this.sw.lon;
};

proto.getLatitudeHeight = function () {
	return this.ne.lat - this.sw.lat;
};

proto.getLatitudeDistanceToCenter = function () {
	return this.ne.lat - this.getCenter().lat;
};

proto.getLongitudeDistanceToCenter = function () {
	return this.ne.lon - this.getCenter().lon;
};

proto.createAdjacentRegionEast = function () {
	var region = new LatLngRegion();
	var sw = this.sw.clone();
	var ne = this.ne.clone();
	ne.lon += this.getLongitudeWidth();
	sw.lon += this.getLongitudeWidth();

	region.addLatLng(sw);
	region.addLatLng(ne);

	return region;
};

proto.toUrlValue = function () {
	return [this.sw.lat, this.sw.lon, this.ne.lat, this.ne.lon].join(',');
};

LatLngRegion.createFromCenterAndRadius = function (center, latRadius, lngRadius) {
	var ne = new LatLngCoord(center.lat - latRadius, center.lng - lngRadius);
	var sw = new LatLngCoord(center.lat + latRadius, center.lng + lngRadius);

	var region = new LatLngRegion();
	region.addLatLng(ne);
	region.addLatLng(sw);

	return region;
};

LatLngRegion.createFromURLParams = function (boundsStr) {
	var queryBounds = boundsStr.split(',');
	var ne = new LatLngCoord(queryBounds[2], queryBounds[3]);
	var sw = new LatLngCoord(queryBounds[0], queryBounds[1]);
	var region = new LatLngRegion();

	region.addLatLng(ne);
	region.addLatLng(sw);

	return region;

};

module.exports = LatLngRegion;