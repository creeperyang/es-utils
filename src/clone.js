export default function clone(source) {
    // Exclude "null"
    if (source && typeof source === 'object') {
        const to = {};
        /* eslint-disable guard-for-in, no-restricted-syntax */
        for(const k in source) {
            to[k] = clone(source[k]);
        }
        /* eslint-enable guard-for-in, no-restricted-syntax */
        return to;
    }
    return source;
}
