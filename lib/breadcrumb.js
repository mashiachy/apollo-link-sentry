"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeBreadcrumb = void 0;
var operation_1 = require("./operation");
function makeBreadcrumb(operation, options) {
    var _a;
    var attachBreadcrumbs = options.attachBreadcrumbs;
    var definition = (0, operation_1.extractDefinition)(operation);
    var data = {};
    var uri = options.uri;
    if (uri) {
        data.url = uri;
    }
    var operationName = (_a = definition.name) === null || _a === void 0 ? void 0 : _a.value;
    if (operationName) {
        data.operationName = operationName;
    }
    if (attachBreadcrumbs.includeVariables) {
        data.variables = operation.variables;
    }
    return {
        type: 'http',
        category: "graphql.".concat(definition.operation),
        data: data,
    };
}
exports.makeBreadcrumb = makeBreadcrumb;
