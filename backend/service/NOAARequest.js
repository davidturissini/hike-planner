'use strict';

var soap = require('soap');
var xml2js = require('xml2js');
var Promise = require('bluebird');
var EventEmitter = require('events').EventEmitter;
var client;
var url = 'http://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php?wsdl';

function NOAARequest (method, data) {
	this.method = method;
	this.data = data;
};


var proto = NOAARequest.prototype = Object.create(EventEmitter.prototype);


proto.initClient = function () {

	return new Promise(function (res, rej) {
		if (client) {
			res();
			return;
		}

		soap.createClient(url, function(err, c) {
			if (err) {
				rej();
				return;
			}

			client = c;
			res();
		});

	});

};

proto.send = function (data) {
	var method = this.method;
	var data = this.data;

	return this.initClient()
		.then(function () {
			return new Promise(function (res, rej) {
				
				client[method](data, function(err, result) {
					var xmlResult;
					var xmlString;
					
					Object.keys(result).forEach(function (key) {

						if (result[key] && result[key].$value) {
							xmlString = result[key].$value;
						}
					});
					
					if (xmlString) {
						xml2js.parseString(xmlString, function (err, result) {
							res(result.dwml);

						});
					}
					
				});
			});
		});
};


module.exports = NOAARequest;