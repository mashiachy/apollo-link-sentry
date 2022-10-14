"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDefinition = void 0;
function extractDefinition(operation) {
    return operation.query.definitions.find(function (q) { return q.kind === 'OperationDefinition'; });
}
exports.extractDefinition = extractDefinition;
