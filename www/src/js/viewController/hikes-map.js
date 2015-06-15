'use strict';

var EventEmitter = require('events').EventEmitter;
var mapView = require('./../view/map/main');
var hikeMapMarkerView = require('./../view/hike/map-marker');


var hikesMapPrototype = Object.create(EventEmitter.prototype, {
    center: {
        set: function (center) {
            this.view.center = center;
        }
    },
    el: {
        set: function (el) {
            this.view.el = el;
        }
    },

    googleMap: {
        get: function () {
            return this.view.googleMap;
        }
    }
});

hikesMapPrototype.getMarkerForHike = function (hike) {
    return this.markers[hike.id];
};

hikesMapPrototype.renderView = function () {
    this.view.render();

    var map = this.view.googleMap;

    if (this.hikes) {
        this.hikes.forEach(function (hike) {
            var markerView = hikeMapMarkerView.create(hike);
            var marker = markerView.render();
            
            this.markers[hike.id] = hike;
            marker.setMap(map);

        }, this);
    }
};


hikesMapPrototype.create = function (options) {
    options = options || {};

    var hikesMap = Object.create(this);
    hikesMap.view = mapView.create();
    hikesMap.markers = {};


    return hikesMap;
};



module.exports = hikesMapPrototype;