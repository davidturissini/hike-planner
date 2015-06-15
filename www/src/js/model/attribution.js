'use strict';

var attributeProto = {};

module.exports = {

	create: function (attrs) {
		var attribution = Object.create(attributeProto);
		attribution.source = attrs.source;
		attribution.url = attrs.url;

		return attribution;


	}

};