export const defaultOptions = {
    shouldHandleOperation: undefined,
    uri: undefined,
    setSpan: true,
    setFingerprint: true,
    attachBreadcrumbs: {
        includeVariables: false,
        includeError: false,
        transform: undefined,
    },
};
export function withDefaults(options) {
    return {
        ...defaultOptions,
        ...options,
        attachBreadcrumbs: {
            ...defaultOptions.attachBreadcrumbs,
            ...options.attachBreadcrumbs,
        }
    };
}
