import { Operation } from '@apollo/client/core';
import { GraphQLBreadcrumb } from './breadcrumb';
import { FullOptions } from './options';
export declare function setTransaction(operation: Operation): void;
export declare const DEFAULT_FINGERPRINT = "{{ default }}";
export declare function setFingerprint(operation: Operation): void;
export declare function attachBreadcrumbToSentry(operation: Operation, breadcrumb: GraphQLBreadcrumb, options: FullOptions): void;
