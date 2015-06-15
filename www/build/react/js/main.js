'use strict';

var React = require('react');
var HikeMap = require('./components/hike/Map');
var HikeList = require('./view/hike/list');
var HikeQuery = require('./dataQueries/HikesQuery');
var WeatherQuery = require('./dataQueries/WeatherQuery');
var _ = require('lodash');

var HikeFinder = React.createClass({
    displayName:'HikeList',

    getInitialState: function () {
        return {
            hikes:[],
            weather:[]
        };
    },

    getHikeFromWeather: function (weather) {
        var lat;
        var lng;
        var hike;
        var coord = weather.attributes.coord;

        for(var i = 0; i < this.state.hikes.length; i += 1) {
            hike = this.state.hikes[i];
            lat = Math.round(hike.coordinate.latitude * 100) / 100;
            lng = Math.round(hike.coordinate.longitude * 100) / 100;

            if (coord.lat === lat && coord.lon === lng) {
                return hike;
            }
        }
    },

    weatherLoaded: function (weather) {
        var hikes = this.state.hikes.slice(0);

        weather.forEach(function (w, index) {
            var hike = this.getHikeFromWeather(w);
            
            if (hike) {
                hike.weather = w;
            }

        }, this);

        this.setState({
            hikes:hikes
        });
    },

    hikesLoaded: function (hikes) {
        this.setState({
            hikes:hikes
        });

        WeatherQuery.queryHikes(hikes.slice(0, 5)).then(this.weatherLoaded);

    },

    onBoundsChange: function (evt) {
        var bounds = evt.bounds;
        var hikesQuery = HikeQuery.createQueryWithBounds(bounds);
        
        hikesQuery.send().then(this.hikesLoaded);

    },

    render: function () {
        return (
            React.createElement("div", {id: "hike-finder"}, 
                React.createElement(HikeMap, {
                    hikes: this.state.hikes, 
                    boundsChangeDebounce: "300", 
                    onBoundsChange: this.onBoundsChange, 
                    zoom: "10", 
                    centerLat: "38.937479", 
                    centerLng: "-119.982806"}), 

                React.createElement(HikeList, {hikes: this.state.hikes})

            )
        );
    }

});

React.render(React.createElement(HikeFinder), document.getElementById('main'));