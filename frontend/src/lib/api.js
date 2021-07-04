import { dev } from '$app/env';
import { token } from './session_storage';
import { get as get_store_value } from "svelte/store";

const base = dev ? 'http://localhost:8080' : 'https://api.raiser.dev';

async function send({ method, path, data, f = fetch }) {
    const opts = { method, headers: {} };

    opts.headers['Authorization'] = get_store_value(token);

    if (data) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(data);
    }

    // TODO: Fix error handling here! In case of 401 no data was returned so the json parsing fails and throws an error!
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
