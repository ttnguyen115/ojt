export function createAction(type, payload = {}, meta = {}) {
    return { type, payload, meta };
}
