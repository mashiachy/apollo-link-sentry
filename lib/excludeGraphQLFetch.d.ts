import { BrowserOptions } from '@sentry/browser';
declare type BeforeBreadcrumbCallback = NonNullable<BrowserOptions['beforeBreadcrumb']>;
export declare const excludeGraphQLFetch: BeforeBreadcrumbCallback;
export declare function withoutGraphQLFetch(beforeBreadcrumb: BeforeBreadcrumbCallback): BeforeBreadcrumbCallback;
export {};
