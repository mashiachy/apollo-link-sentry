import { FetchResult, Operation } from '@apollo/client/core';
import { Breadcrumb as SentryBreadcrumb } from '@sentry/browser';
import { FullOptions } from './options';
export interface BreadcrumbData {
    url?: string;
    query?: string;
    variables?: Record<string, unknown>;
    operationName?: string;
    fetchResult?: FetchResult;
    error?: Error;
    cache?: Record<string, unknown>;
    context?: Record<string, unknown>;
}
export interface GraphQLBreadcrumb extends SentryBreadcrumb {
    data: BreadcrumbData;
}
export declare function makeBreadcrumb(operation: Operation, options: FullOptions): GraphQLBreadcrumb;
