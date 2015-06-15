'use strict';

var LatLngCoord = require('./LatLngCoord');
var NOAAWeatherReport = require('./NOAAWeatherReport');

function NOAAResponse (data) {
	this.data = data;

	this.locations = {};
	this.timeLayouts = {};
	this.parseTimeLayouts();
	this.parseLocations();
	this.mapParametersToLocations();

};

var proto = NOAAResponse.prototype;

proto.mapParametersToLocations = function () {
	this.data.parameters.forEach(function (parameterSet) {
		var location = this.getLocationForParameterSet(parameterSet);

		location.parameters = parameterSet;
	}, this);
};

proto.parseTimeLayouts = function () {
	this.data['time-layout'].forEach(function (layout) {
		var key = layout['layout-key'][0];

		var timeLayout = this.timeLayouts[key] = {
			startTimes:layout['start-valid-time'].slice(0)
		};

		if (layout['end-valid-time']) {
			timeLayout.endTimes = layout['end-valid-time'].slice(0);
		}

	}, this);
};

proto.getTimeLayoutForParameter = function (parameter) {
	var timelayoutId = parameter.$['time-layout'];
	
	return this.timeLayouts[timelayoutId];
};

proto.getUnitsForParameter = function (parameter) {
	return parameter.$['units'];
};

proto.parseLocations = function () {
	this.data['location'].forEach(function (location) {
		var point = location.point[0].$;
		var locationId = location['location-key'];
		this.locations[locationId] = {
			coord:new LatLngCoord(point.latitude, point.longitude)
		};
	}, this);
};


proto.getLocationForParameterSet = function (parameterSet) {
	var locationId = parameterSet.$['applicable-location'];
	return this.locations[locationId];
};

proto.generateReports = function (paramNames) {

	var reports = Object.keys(this.locations).map(function (key) {
		var location = this.locations[key];
		var report = new NOAAWeatherReport(location.coord);


		paramNames.forEach(function (paramName) {

			location.parameters[paramName].forEach(function (param) {
				var timeLayout = this.getTimeLayoutForParameter(param);
				var units = this.getUnitsForParameter(param);
				var label = param.name[0];
				var key = paramName;

				if (paramName.toLowerCase() === 'temperature') {
					key = label.toLowerCase().replace(/\s/g, '-');
				}
				
				report.addCategory(key, label);
				
				param.value.forEach(function (val, index) {
					if (val.$ && val.$['xsi:nil'] === 'true') {
						return;
					}

					if (val.$) {
						val = val._;
					}

					var time = {
						start:timeLayout.startTimes[index]
					};


					if (timeLayout.endTimes) {
						time.end = timeLayout.endTimes[index];
					}

					report.addDataPoint(key, {
						time:time,
						value:val,
						units:units
					});

				}, this);

			}, this);
		}, this);

		report.data['conditions-icon'] = location['parameters']['conditions-icon'][0]['icon-link'];
		report.data['hazards'] = location['parameters']['hazards'][0]['hazard-conditions'];


		var weatherTimeLayout = this.getTimeLayoutForParameter(location['parameters']['weather'][0]);
		report.data['weather'] = location['parameters']['weather'][0]['weather-conditions'].map(function (condition, index) {
			if (typeof condition === 'string') {
				condition = {
					value:[{
						'$':{
							'weather-type':'fair'
						}
					}]
				};
			}

			var time = {
				start:weatherTimeLayout.startTimes[index]
			};


			if (weatherTimeLayout.endTimes) {
				time.end = weatherTimeLayout.endTimes[index];
			}

			return {
				time:time,
				conditions:condition.value.map(function (conditionValue) {
					return conditionValue.$;
				})
			}

		}, this).filter(function (w) {
			return w;
		});

		report.raw = this.data;

		return report;

	}, this);


	return reports;


};


module.exports = NOAAResponse;