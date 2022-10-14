import { Operation } from '@apollo/client/core';
import { Breadcrumb } from '@sentry/browser';
import { GraphQLBreadcrumb } from './breadcrumb';
export declare type NonEmptyArray<T> = [T, ...Array<T>];
export interface FullOptions {
    shouldHandleOperation: undefined | ((operation: Operation) => boolean);
    uri: undefined | string;
    setSpan: true | false;
    setFingerprint: true | false;
    attachBreadcrumbs: AttachBreadcrumbsOptions | false;
}
export declare type AttachBreadcrumbsOptions = {
    includeVariables: false | true;
    includeError: false | true;
    transform: undefined | ((breadcrumb: GraphQLBreadcrumb, operation: Operation) => Breadcrumb);
};
export declare const defaultOptions: {
    readonly shouldHandleOperation: undefined;
    readonly uri: undefined;
    readonly setSpan: true;
    readonly setFingerprint: true;
    readonly attachBreadcrumbs: {
        readonly includeVariables: false;
        readonly includeError: false;
        readonly transform: undefined;
    };
};
export declare function withDefaults(options: SentryLinkOptions): FullOptions;
export declare type SentryLinkOptions = Partial<Pick<FullOptions, 'shouldHandleOperation' | 'uri' | 'setSpan' | 'setFingerprint'>> & {
    attachBreadcrumbs?: Partial<AttachBreadcrumbsOptions> | false;
};
