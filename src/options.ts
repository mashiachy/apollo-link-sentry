import { Operation } from '@apollo/client/core';
import { Breadcrumb } from '@sentry/browser';

import { GraphQLBreadcrumb } from './breadcrumb';

export type NonEmptyArray<T> = [T, ...Array<T>];

export interface FullOptions {
  /**
   * Determines if the given operation should be handled or discarded.
   *
   * If undefined, all operations will be included.
   */
  shouldHandleOperation: undefined | ((operation: Operation) => boolean);

  /**
   * The uri of the GraphQL endpoint.
   *
   * Used to add context information, e.g. to breadcrumbs.
   *
   * Defaults to undefined.
   */
  uri: undefined | string;

  /**
   * Set the Sentry transaction name to the GraphQL operation name.
   *
   * May be overwritten by other parts of your app.
   *
   * Defaults to true.
   */
  setTransaction: true | false;

  /**
   * Narrow Sentry's fingerprint by appending the GraphQL operation name to the {{default}} key.
   *
   * Only the last executed operation will be added, not every operation that's been through the link.
   * May be overwritten by other parts of your app.
   *
   * Defaults to true.
   */
  setFingerprint: true | false;

  /**
   * Attach a breadcrumb for executed GraphQL operations.
   *
   * The following information will be included by default:
   * {
   *   type: 'http',
   *   category: `graphql.${operationType}`,
   *   message: operationName,
   *   level: errors ? 'error' : 'info',
   * }
   */
  attachBreadcrumbs: AttachBreadcrumbsOptions | false;
}

export type AttachBreadcrumbsOptions = {
  /**
   * Include the variable values?
   *
   * Be careful not to leak sensitive information or send too much data.
   *
   * Defaults to false.
   */
  includeVariables: false | true;

  /**
   * Include the response error?
   *
   * Be careful not to leak sensitive information or send too much data.
   *
   * Defaults to false.
   */
  includeError: false | true;

  /**
   * Modify the breadcrumb right before it is sent.
   *
   * Can be used to add additional data from the operation or clean up included data.
   * Very useful in combination with options like `includeVariables` and `includeContext`.
   *
   * Defaults to undefined.
   */
  transform:
    | undefined
    | ((breadcrumb: GraphQLBreadcrumb, operation: Operation) => Breadcrumb);
};

export const defaultOptions = {
  shouldHandleOperation: undefined,
  uri: undefined,
  setTransaction: true,
  setFingerprint: true,

  attachBreadcrumbs: {
    includeVariables: false,
    includeError: false,
    transform: undefined,
  },
} as const;

export function withDefaults(options: SentryLinkOptions): FullOptions {
  // return deepMerge(defaultOptions, options)
  return {
    ...defaultOptions,
    ...options,
    attachBreadcrumbs: {
      ...defaultOptions.attachBreadcrumbs,
      ...options.attachBreadcrumbs,
    }
  };
}

export type SentryLinkOptions = Partial<
  Pick<
    FullOptions,
    'shouldHandleOperation' | 'uri' | 'setTransaction' | 'setFingerprint'
  >
> & {
  attachBreadcrumbs?: Partial<AttachBreadcrumbsOptions> | false;
};
