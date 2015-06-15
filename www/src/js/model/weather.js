'use strict';

var Temperature = require('./Temperature');

var weatherProto = {

    getMinMaxTemperaturesForTimeRange: function (start, end) {
        var tempsData = this.attributes.data['temperature'].data;
        var minMax = {
            min:Temperature.create(200, 'Fahrenheit'),
            max:Temperature.create(0, 'Fahrenheit')
        };

        tempsData.forEach(function (tempData) {
            var temp;
            var time = new Date(tempData.time.start);

            if (time >= start && time <= end) {
                temp = Temperature.create(tempData.value, tempData.units);
    

                if (temp.isLessThan(minMax.min)) {
                    minMax.min = temp;
                }

                if (temp.isGreaterThan(minMax.max)) {
                    minMax.max = temp;
                }

            }

        }, this);


        return minMax;
    },

	getHourlyTemperatures: function () {
		return this.attributes.data['apparent-temperature'].data;
	},

    getCloudAmount: function () {
        return this.attributes.data['cloud-amount'].data;
    },

    getProbabilityOfPrecipitation: function () {
        return this.attributes.data['probability-of-precipitation'].data;
    },

    getWeatherData: function () {
        return this.attributes.data['weather'];
    },

	create: function (attrs) {
		var weather = Object.create(weatherProto);
		weather.attributes = attrs;

		return weather;

	}

};


module.exports = weatherProto;