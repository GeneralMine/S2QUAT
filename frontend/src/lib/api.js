import { dev } from '$app/env';

const base = dev ? 'http://localhost:8080' : 'https://s2quat.raiser.dev';

async function send({ method, path, data, f = fetch }) {
    const opts = { method, headers: {} };

    if (data) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(data);
    }

    return f(`${base}/${path}`, opts)
        .then((r) => r.json());
}

export function get(path, f) {
    return send({ method: 'GET', path, f });
}

export function del(path, f) {
    return send({ method: 'DELETE', path, f });
}

export function post(path, data, f) {
    return send({ method: 'POST', path, data, f });
}

export function put(path, data, f) {
    return send({ method: 'PUT', path, data, f });
}

export async function roflul(func) {
    try {
        let res = await func()
        return { res };
    } catch (err) {
        return { err };
    }
}

/*
export function loader(data, f = fetch) {
    async function l(method, ...urls) {
        try {
            let a = await Promise.all(urls.map(el => send({ method, el, data, f })));
            return { res: a };
        } catch (err) {
            return { err }
        }
    }

    return {
        GET: l("GET"),
        DEL: l("DEL"),
        POST: l("POST"),
        PUT: l("PUT"),
    }
}
*/