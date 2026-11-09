export const h = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
export const fail = (status, message) => Object.assign(new Error(message), { status });
