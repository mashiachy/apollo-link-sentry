"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentryLink = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@apollo/client/core");
var zen_observable_1 = (0, tslib_1.__importDefault)(require("zen-observable"));
var breadcrumb_1 = require("./breadcrumb");
var options_1 = require("./options");
var sentry_1 = require("./sentry");
var SentryLink = (function (_super) {
    (0, tslib_1.__extends)(SentryLink, _super);
    function SentryLink(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.options = (0, options_1.withDefaults)(options);
        return _this;
    }
    SentryLink.prototype.request = function (operation, forward) {
        var _a, _b;
        var options = this.options;
        if (!((_b = (_a = options.shouldHandleOperation) === null || _a === void 0 ? void 0 : _a.call(options, operation)) !== null && _b !== void 0 ? _b : true)) {
            return forward(operation);
        }
        if (options.setTransaction) {
            (0, sentry_1.setTransaction)(operation);
        }
        if (options.setFingerprint) {
            (0, sentry_1.setFingerprint)(operation);
        }
        var attachBreadcrumbs = options.attachBreadcrumbs;
        var breadcrumb = attachBreadcrumbs
            ? (0, breadcrumb_1.makeBreadcrumb)(operation, options)
            : undefined;
        return new zen_observable_1.default(function (originalObserver) {
            var subscription = forward(operation).subscribe({
                next: function (result) {
                    if (attachBreadcrumbs) {
                        breadcrumb.level = severityForResult(result);
                        if (attachBreadcrumbs.includeError &&
                            result.errors &&
                            result.errors.length > 0) {
                            breadcrumb.data.error = new core_1.ApolloError({
                                graphQLErrors: result.errors,
                            });
                        }
                    }
                    originalObserver.next(result);
                },
                complete: function () {
                    if (attachBreadcrumbs) {
                        (0, sentry_1.attachBreadcrumbToSentry)(operation, breadcrumb, options);
                    }
                    originalObserver.complete();
                },
                error: function (error) {
                    if (attachBreadcrumbs) {
                        breadcrumb.level = 'error';
                        var scrubbedError = void 0;
                        if (isServerError(error)) {
                            var result = error.result, response = error.response, rest = (0, tslib_1.__rest)(error, ["result", "response"]);
                            scrubbedError = rest;
                        }
                        else {
                            scrubbedError = error;
                        }
                        if (attachBreadcrumbs.includeError) {
                            breadcrumb.data.error = scrubbedError;
                        }
                        (0, sentry_1.attachBreadcrumbToSentry)(operation, breadcrumb, options);
                    }
                    originalObserver.error(error);
                },
            });
            return function () {
                subscription.unsubscribe();
            };
        });
    };
    return SentryLink;
}(core_1.ApolloLink));
exports.SentryLink = SentryLink;
function isServerError(error) {
    return (typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        'result' in error &&
        'statusCode' in error);
}
function severityForResult(result) {
    return result.errors && result.errors.length > 0 ? 'error' : 'info';
}
