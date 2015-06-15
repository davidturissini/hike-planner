'use strict';

var jquery = require('jquery');
var hike = require('./../model/hike');

function HikesQuery (params) {
    this.params = params || {};
};

var proto = HikesQuery.prototype;


proto.send =  function () {

    return jquery.ajax({
        url:'/hikes',
        dataType:'json',
        data:this.params
    })
    .then(function (hikesData) {
        return hikesData.map(function (hikeData) {
            return hike.create(hikeData);
        });
    });

};

HikesQuery.createQueryWithBounds = function (bounds) {
    return new HikesQuery({
        bounds:bounds.toUrlValue()
    })
};

module.exports = HikesQuery;

