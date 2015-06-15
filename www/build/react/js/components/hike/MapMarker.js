'use strict';

var React = require('react');


var HikeMapMarker = React.createClass({

    displayName:'HikeMapMarker',

    componentDidMount: function () {
        var hike = this.props.hike;

        this.marker = new google.maps.Marker({
            position:new google.maps.LatLng(hike.coordinate.latitude, hike.coordinate.longitude),
            map:this.props.map
        });
    },

    componentWillUnmount: function () {
        console.log('didunmount');
        this.marker.setMap(null);
    },

    render: function () {
        
    }

})


module.exports = HikeMapMarker;