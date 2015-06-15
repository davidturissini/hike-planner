'use strict';

var React = require('react');
var _ = require('lodash');

var HikeWeather = React.createClass({

    displayName:'HikeWeather',

    getInitialState: function () {
        return {
            weather:null
        };
    },


    render: function () {
        var weather = this.props.weather;
        var weatherData = weather.getWeatherData();
        console.log(weather);

        var weatherItems = weatherData.map(function (w, index) {
            var previous = weatherData[index - 1];
            var minMaxTemperatures;
            var coverage = w.conditions[0].coverage;
            var intensity = w.conditions[0].intensity;
            var qualifier = w.conditions[0].qualifier;
            var type = w.conditions[0]['weather-type'];
            var timeString = new Date(w.time.start);
            var coverageString = [coverage];

            timeString = timeString.getMonth() + '/' + timeString.getDate() + ' ' + timeString.getHours() + ':' + timeString.getMinutes();

            if (intensity !== 'none') {
                coverageString.push(intensity);
            }

            coverageString.push(type);
            coverageString = coverageString.join(' ');

            if (previous) {
                minMaxTemperatures = weather.getMinMaxTemperaturesForTimeRange(
                    new Date(previous.time.start),
                    new Date(w.time.start)
                );

                minMaxTemperatures = (
                    React.createElement("div", null, 
                        React.createElement("div", null, "High: ", minMaxTemperatures.max.value, " ", minMaxTemperatures.max.units), 
                        React.createElement("div", null, "Low: ", minMaxTemperatures.min.value, " ", minMaxTemperatures.min.units)
                    )
                );
            }

            return (
                React.createElement("li", null, 
                    React.createElement("h6", {className: "forecast-time"}, timeString), 
                    React.createElement("div", {className: "forecast-precipitation"}, coverageString), 
                    minMaxTemperatures
                )
            );
        });

        return (
            React.createElement("ul", {className: "forecast"}, 
                weatherItems
            )
        );        
    }

});

module.exports = HikeWeather;