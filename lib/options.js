"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withDefaults = exports.defaultOptions = void 0;
var tslib_1 = require("tslib");
exports.defaultOptions = {
    shouldHandleOperation: undefined,
    uri: undefined,
    setTransaction: true,
    setFingerprint: true,
    attachBreadcrumbs: {
        includeVariables: false,
        includeError: false,
        transform: undefined,
    },
};
function withDefaults(options) {
    return (0, tslib_1.__assign)((0, tslib_1.__assign)((0, tslib_1.__assign)({}, exports.defaultOptions), options), { attachBreadcrumbs: (0, tslib_1.__assign)((0, tslib_1.__assign)({}, exports.defaultOptions.attachBreadcrumbs), options.attachBreadcrumbs) });
}
exports.withDefaults = withDefaults;
