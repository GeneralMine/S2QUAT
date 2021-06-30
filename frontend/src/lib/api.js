import { dev } from '$app/env';

const base = dev ? 'http://localhost:8080' : 'https://s2quat.raiser.dev';

async function send({ method, path, data, token, f = fetch }) {
    const opts = { method, headers: {} };

    if (data) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(data);
    }

    if (token) {
        opts.headers['Authorization'] = `Token ${token}`;
    }

    return f(`${base}/${path}`, opts)
        .then((r) => r.text())
        .then((json) => {
            try {
                return { res: JSON.parse(json) };
            } catch (err) {
                return { err };
            }
        });
}

export function get(path, token, f) {
    return send({ method: 'GET', path, token, f });
}

export function del(path, token, f) {
    return send({ method: 'DELETE', path, token, f });
}

export function post(path, data, token, f) {
    return send({ method: 'POST', path, data, token, f });
}

export function put(path, data, token, f) {
    return send({ method: 'PUT', path, data, token, f });
}