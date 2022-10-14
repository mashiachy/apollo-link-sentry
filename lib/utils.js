export function stringifyObjectKeys(object) {
    const stringified = {};
    for (const [key, value] of Object.entries(object)) {
        stringified[key] = typeof value === 'object' ? stringify(value) : value;
    }
    return stringified;
}
export function stringify(value) {
    return JSON.stringify(value, null, 2);
}
