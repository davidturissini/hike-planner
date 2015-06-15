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
                    <div>
                        <div>High: {minMaxTemperatures.max.value} {minMaxTemperatures.max.units}</div>
                        <div>Low: {minMaxTemperatures.min.value} {minMaxTemperatures.min.units}</div>
                    </div>
                );
            }

            return (
                <li>
                    <h6 className="forecast-time">{timeString}</h6>
                    <div className="forecast-precipitation">{coverageString}</div>
                    {minMaxTemperatures}
                </li>
            );
        });

        return (
            <ul className="forecast">
                {weatherItems}
            </ul>
        );        
    }

});

module.exports = HikeWeather;