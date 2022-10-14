import {
  ApolloError,
  ApolloLink,
  FetchResult,
  NextLink,
  Operation,
  type ServerError,
} from '@apollo/client/core';
import type { SeverityLevel, Span } from '@sentry/types';
import Observable from 'zen-observable';

import { GraphQLBreadcrumb, makeBreadcrumb } from './breadcrumb';
import { FullOptions, SentryLinkOptions, withDefaults } from './options';
import {
  attachBreadcrumbToSentry,
  setFingerprint,
  setSpan,
} from './sentry';

export class SentryLink extends ApolloLink {
  private readonly options: FullOptions;

  constructor(options: SentryLinkOptions = {}) {
    super();
    this.options = withDefaults(options);
  }

  request(
    operation: Operation,
    forward: NextLink,
  ): Observable<FetchResult> | null {
    const options = this.options;

    if (!(options.shouldHandleOperation?.(operation) ?? true)) {
      return forward(operation);
    }

    let span: Span | undefined
    if (options.setSpan) {
      span = setSpan(operation);
    }

    if (options.setFingerprint) {
      setFingerprint(operation);
    }

    const attachBreadcrumbs = options.attachBreadcrumbs;
    const breadcrumb = attachBreadcrumbs
      ? makeBreadcrumb(operation, options)
      : undefined;

    // While this could be done more simplistically by simply subscribing,
    // wrapping the observer in our own observer ensures we get the results
    // before they are passed along to other observers. This guarantees we
    // get to run our instrumentation before others observers potentially
    // throw and thus flush the results to Sentry.
    return new Observable<FetchResult>((originalObserver) => {
      const subscription = forward(operation).subscribe({
        next: (result) => {
          if (attachBreadcrumbs) {
            // We must have a breadcrumb if attachBreadcrumbs was set
            (breadcrumb as GraphQLBreadcrumb).level = severityForResult(result);

            if (
              attachBreadcrumbs.includeError &&
              result.errors &&
              result.errors.length > 0
            ) {
              // We must have a breadcrumb if attachBreadcrumbs was set
              (breadcrumb as GraphQLBreadcrumb).data.error = new ApolloError({
                graphQLErrors: result.errors,
              });
            }
          }

          originalObserver.next(result);
        },
        complete: () => {
          if (attachBreadcrumbs) {
            attachBreadcrumbToSentry(
              operation,
              // We must have a breadcrumb if attachBreadcrumbs was set
              breadcrumb as GraphQLBreadcrumb,
              options,
            );
          }
          if (options.setSpan) {
            span?.finish?.()
          }

          originalObserver.complete();
        },
        error: (error) => {
          if (attachBreadcrumbs) {
            // We must have a breadcrumb if attachBreadcrumbs was set
            (breadcrumb as GraphQLBreadcrumb).level = 'error';

            let scrubbedError;
            if (isServerError(error)) {
              const { result, response, ...rest } = error;
              scrubbedError = rest;

            } else {
              scrubbedError = error;
            }

            if (attachBreadcrumbs.includeError) {
              // We must have a breadcrumb if attachBreadcrumbs was set
              (breadcrumb as GraphQLBreadcrumb).data.error = scrubbedError;
            }

            attachBreadcrumbToSentry(
              operation,
              // We must have a breadcrumb if attachBreadcrumbs was set
              breadcrumb as GraphQLBreadcrumb,
              options,
            );
          }

          if (options.setSpan) {
            span?.finish?.()
          }

          originalObserver.error(error);
        },
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }
}

function isServerError(error: unknown): error is ServerError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    'result' in error &&
    'statusCode' in error
  );
}

function severityForResult(result: FetchResult): SeverityLevel {
  return result.errors && result.errors.length > 0 ? 'error' : 'info';
}
