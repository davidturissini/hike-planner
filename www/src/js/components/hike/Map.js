'use strict';

var React = require('react');
var _ = require('lodash');

var Map = React.createClass({

    displayName:'HikeMap',

    getInitialState: function () {
        return {
            map:null
        };
    },

    boundsChanged: function () {
        if (typeof this.props.onBoundsChange === 'function') {
            this.props.onBoundsChange({
                bounds:this.state.map.getBounds()
            });
        }
    },

    componentDidMount: function () {
        var node = this.getDOMNode();

        var centerPoint = {
            lat:this.props.centerLat || 38.937479,
            lon:this.props.centerLng || -119.982806
        };

        var center = new google.maps.LatLng(centerPoint.lat, centerPoint.lon);

        var map = new google.maps.Map(node, {
            center:center,
            scrollwheel: false,
            zoom:parseInt(this.props.zoom)
        });

        var boundsChanged = _.debounce(this.boundsChanged, this.props.boundsChangeDebounce);
        google.maps.event.addListener(map, 'bounds_changed', boundsChanged);

        this.setState({
            map:map
        });
    },

    markers:{},

    render: function () {
        var map = this.state.map;
        var hikes = this.props.hikes;

        var hikeIds = hikes.map(function (hike) {
            var latLng = new google.maps.LatLng(hike.coordinate.latitude, hike.coordinate.longitude);

            if (!this.markers[hike.id]) {
                this.markers[hike.id] = new google.maps.Marker({
                    position:latLng,
                    map:map
                });
            }

            return hike.id;

        }, this);

        Object.keys(this.markers).forEach(function (id) {
            if (hikeIds.indexOf(id) === -1) {
                this.markers[id].setMap(null);
                delete this.markers[id];
            }
        }, this);


        return (
            <div className="map"></div>
        );
    }

});

module.exports = Map;