'use strict';

function NOAAWeatherReport (latLng) {
	this.coord = latLng;
	this.data = {};
}

var proto = NOAAWeatherReport.prototype;

proto.addCategory = function (key, label) {

	this.data[key] = {
		label:label,
		data:[]
	};
};

proto.addDataPoint = function (key, data) {
	this.data[key].data.push(data);
};

module.exports = NOAAWeatherReport;
