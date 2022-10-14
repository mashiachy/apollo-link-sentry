export const excludeGraphQLFetch = (breadcrumb) => {
    if (breadcrumb.category === 'fetch') {
        const url = breadcrumb.data?.url ?? '';
        if (url.includes('/graphql')) {
            return null;
        }
    }
    return breadcrumb;
};
export function withoutGraphQLFetch(beforeBreadcrumb) {
    return (breadcrumb, hint) => {
        const withoutFetch = excludeGraphQLFetch(breadcrumb, hint);
        if (withoutFetch === null) {
            return null;
        }
        return beforeBreadcrumb(withoutFetch, hint);
    };
}
