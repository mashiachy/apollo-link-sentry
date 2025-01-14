import { BrowserOptions } from '@sentry/browser';

type BeforeBreadcrumbCallback = NonNullable<BrowserOptions['beforeBreadcrumb']>;

export const excludeGraphQLFetch: BeforeBreadcrumbCallback = (breadcrumb) => {
  if (breadcrumb.category === 'fetch') {
    const url: string = breadcrumb.data?.url ?? '';

    if (url.includes('/ws.php')) {
      return null;
    }
  }

  return breadcrumb;
};

export function withoutGraphQLFetch(
  beforeBreadcrumb: BeforeBreadcrumbCallback,
): BeforeBreadcrumbCallback {
  return (breadcrumb, hint) => {
    const withoutFetch = excludeGraphQLFetch(breadcrumb, hint);
    if (withoutFetch === null) {
      return null;
    }

    return beforeBreadcrumb(withoutFetch, hint);
  };
}
