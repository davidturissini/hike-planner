'use strict';

var HikeListView = require('./../view/hike/list');
var React = require('react');

var hikesPaneViewController = {

	getHikesVisibleOnScreen: function () {
		var scrollTop = this.el.scrollTop;
		var height = this.el.offsetHeight;
		var scrollBottom = scrollTop + height;
		
		return this.view.viewItems.map(function (view) {
			var top = view.el.offsetTop;
			var elOffsetHeight = view.el.offsetHeight;
			var bottom = top + elOffsetHeight;
			

			if (
				(top < scrollBottom && top > scrollTop) ||
				(bottom < scrollTop && bottom > scrollBottom)
			) {
				return view.hike;
			}

		}).filter(function (item) {
			return item;
		});
	},

	clearView: function () {
		return this.view.clear();
	},

	renderView: function () {
		this.view.hikes = this.hikes;
		var el = this.view.render();

		if (this.el && el.parentNode !== this.el) {
			this.el.appendChild(el);
		}

		return el;
	},

	create: function (options) {
		options = options || {};

		var hikesPane = Object.create(this);

		hikesPane.view = options.view || hikesListView.create();


		return hikesPane;
	}

};


module.exports = hikesPaneViewController;