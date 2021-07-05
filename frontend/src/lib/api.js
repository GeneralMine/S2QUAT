const base = '';

async function send({ method, path, data, user, f = fetch }) {
    const opts = { method, headers: {} };

    if (data) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(data);
    }

    opts.credentials = "include";
    if (user)
        opts.locals = { user };

    // TODO: Fix error handling here! In case of 401 no data was returned so the json parsing fails and throws an error!
    return f(`${base}/${path}`, opts)
        .then((r) => r.json());
}

export function get(path, user, f) {
    return send({ method: 'GET', path, user, f });
}

export function del(path, user, f) {
    return send({ method: 'DELETE', path, user, f });
}

export function post(path, data, user, f) {
    return send({ method: 'POST', path, data, user, f });
}

export function put(path, data, user, f) {
    return send({ method: 'PUT', path, data, user, f });
}

export async function roflul(func) {
    try {
        let res = await func()
        return { res };
    } catch (err) {
        return { err };
    }
}
