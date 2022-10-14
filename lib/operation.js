export function extractDefinition(operation) {
    return operation.query.definitions.find((q) => q.kind === 'OperationDefinition');
}
