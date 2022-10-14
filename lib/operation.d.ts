import { Operation } from '@apollo/client/core';
import type { OperationDefinitionNode } from 'graphql';
export declare function extractDefinition(operation: Operation): OperationDefinitionNode;
