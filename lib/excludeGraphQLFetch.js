"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withoutGraphQLFetch = exports.excludeGraphQLFetch = void 0;
var excludeGraphQLFetch = function (breadcrumb) {
    var _a, _b;
    if (breadcrumb.category === 'fetch') {
        var url = (_b = (_a = breadcrumb.data) === null || _a === void 0 ? void 0 : _a.url) !== null && _b !== void 0 ? _b : '';
        if (url.includes('/graphql')) {
            return null;
        }
    }
    return breadcrumb;
};
exports.excludeGraphQLFetch = excludeGraphQLFetch;
function withoutGraphQLFetch(beforeBreadcrumb) {
    return function (breadcrumb, hint) {
        var withoutFetch = (0, exports.excludeGraphQLFetch)(breadcrumb, hint);
        if (withoutFetch === null) {
            return null;
        }
        return beforeBreadcrumb(withoutFetch, hint);
    };
}
exports.withoutGraphQLFetch = withoutGraphQLFetch;
