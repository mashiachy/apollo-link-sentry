"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = exports.stringifyObjectKeys = void 0;
function stringifyObjectKeys(object) {
    var stringified = {};
    for (var _i = 0, _a = Object.entries(object); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        stringified[key] = typeof value === 'object' ? stringify(value) : value;
    }
    return stringified;
}
exports.stringifyObjectKeys = stringifyObjectKeys;
function stringify(value) {
    return JSON.stringify(value, null, 2);
}
exports.stringify = stringify;
