'use strict';

var mapMarkerProto = {

    render: function () {
        var coord = this.hike.coordinate;

        var latLng = new google.maps.LatLng(coord.latitude, coord.longitude);
        var marker = new google.maps.Marker({
            position:latLng
        });

        return marker;
    }

};


module.exports = {

    create: function (hike) {
        var markerView = Object.create(mapMarkerProto);
        markerView.hike = hike;

        return markerView;
    }

};