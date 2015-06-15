'use strict';

var collectionProto = {

	paginate: function (numPerPage) {
		var items = this.data.slice(0);
		var paginated = [];
		var page;

		while(items.length > 0) {
			page = this.create(items.splice(0, numPerPage));
			paginated.push(page);
		}

		return paginated;

	},

	create: function (data) {
		var collection = Object.create(collectionProto);

		collection.data = data;

		return collection;
	}

};


module.exports = collectionProto;