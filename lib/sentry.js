import { addBreadcrumb, configureScope, } from '@sentry/browser';
import { extractDefinition } from './operation';
import { stringifyObjectKeys } from './utils';
export function setTransaction(operation) {
    const definition = extractDefinition(operation);
    const name = definition.name;
    if (name) {
        configureScope((scope) => {
            scope.setTransactionName(name.value);
        });
    }
}
export const DEFAULT_FINGERPRINT = '{{ default }}';
export function setFingerprint(operation) {
    const definition = extractDefinition(operation);
    const name = definition.name;
    if (name) {
        configureScope((scope) => {
            scope.setFingerprint([DEFAULT_FINGERPRINT, name.value]);
        });
    }
}
export function attachBreadcrumbToSentry(operation, breadcrumb, options) {
    const transformed = options.attachBreadcrumbs &&
        typeof options.attachBreadcrumbs.transform === 'function'
        ? options.attachBreadcrumbs.transform(breadcrumb, operation)
        : breadcrumb;
    transformed.data = stringifyObjectKeys(transformed.data);
    addBreadcrumb(transformed);
}
