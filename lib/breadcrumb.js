import { extractDefinition } from './operation';
export function makeBreadcrumb(operation, options) {
    const attachBreadcrumbs = options.attachBreadcrumbs;
    const definition = extractDefinition(operation);
    const data = {};
    const uri = options.uri;
    if (uri) {
        data.url = uri;
    }
    const operationName = definition.name?.value;
    if (operationName) {
        data.operationName = operationName;
    }
    if (attachBreadcrumbs.includeVariables) {
        data.variables = operation.variables;
    }
    return {
        type: 'http',
        category: `graphql.${definition.operation}`,
        data,
    };
}
