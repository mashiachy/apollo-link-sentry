import { FetchResult, Operation } from '@apollo/client/core';
import { Breadcrumb as SentryBreadcrumb } from '@sentry/browser';

import { extractDefinition } from './operation';
import { FullOptions, AttachBreadcrumbsOptions } from './options';

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

export function makeBreadcrumb(
  operation: Operation,
  options: FullOptions,
): GraphQLBreadcrumb {
  // We validated this is set before calling this function
  const attachBreadcrumbs =
    options.attachBreadcrumbs as AttachBreadcrumbsOptions;

  const definition = extractDefinition(operation);

  const data: BreadcrumbData = {};

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
