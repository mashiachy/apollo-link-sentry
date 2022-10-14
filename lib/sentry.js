"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachBreadcrumbToSentry = exports.setFingerprint = exports.DEFAULT_FINGERPRINT = exports.setTransaction = void 0;
var browser_1 = require("@sentry/browser");
var operation_1 = require("./operation");
var utils_1 = require("./utils");
function setTransaction(operation) {
    var definition = (0, operation_1.extractDefinition)(operation);
    var name = definition.name;
    if (name) {
        (0, browser_1.configureScope)(function (scope) {
            scope.setTransactionName(name.value);
        });
    }
}
exports.setTransaction = setTransaction;
exports.DEFAULT_FINGERPRINT = '{{ default }}';
function setFingerprint(operation) {
    var definition = (0, operation_1.extractDefinition)(operation);
    var name = definition.name;
    if (name) {
        (0, browser_1.configureScope)(function (scope) {
            scope.setFingerprint([exports.DEFAULT_FINGERPRINT, name.value]);
        });
    }
}
exports.setFingerprint = setFingerprint;
function attachBreadcrumbToSentry(operation, breadcrumb, options) {
    var transformed = options.attachBreadcrumbs &&
        typeof options.attachBreadcrumbs.transform === 'function'
        ? options.attachBreadcrumbs.transform(breadcrumb, operation)
        : breadcrumb;
    transformed.data = (0, utils_1.stringifyObjectKeys)(transformed.data);
    (0, browser_1.addBreadcrumb)(transformed);
}
exports.attachBreadcrumbToSentry = attachBreadcrumbToSentry;
