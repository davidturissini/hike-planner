'use strict';

var jquery = require('jquery');
var EventEmitter = require('events').EventEmitter;
var HikePreview = require('./preview');
var React = require('react');

var HikeListView = React.createClass({
    displayName:'HikeList',
    getInitialState: function() {
        return {
            hikes: []
        };
    },

    componentDidUpdate: function () {
        this.getDOMNode().scrollTop = 0;
    },

    render: function () {
        var hikes = this.props.hikes;

        return (
            <div className="pane">
                <ul>
                {hikes.map(function (hike, index) {
                    return (
                        <HikePreview weather={hike.weather} hike={hike} />
                        );
                })}
                </ul>
            </div>
        );
    }
});


module.exports = HikeListView;