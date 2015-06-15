'use strict';

var Temperature = function (value, units) {
    this.value = parseFloat(value);
    this.units = parseFloat(units);
}

var proto = Temperature.prototype;

proto.isLessThan = function (temperature) {
    return this.value < temperature.value;
};

proto.isGreaterThan = function (temperature) {
    return this.value > temperature.value;
};

proto.isEqualTo = function (temperature) {
    return this.value === temperature.value;
};

module.exports = {

    create: function (value, units) {
        return new Temperature(value, units);
    }

};