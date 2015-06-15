'use strict';

var _ = require('lodash');

module.exports = {

	options: {
		zoom:10,
		draggable:true,
		scrollwheel:false
	},

	render: function () {
		var options = _.clone(this.options);
		options.center = this.center;

		if (!this.googleMap) {
			this.googleMap = new google.maps.Map(this.el, options);
		}

		return this.googleMap;
	},

	create: function () {
		var map = Object.create(this);

		return map;
	}

};