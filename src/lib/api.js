async function send({ method, path, data, session, f = fetch }) {
    const opts = { method, headers: {} };

    if (data) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(data);
    }

    opts.credentials = "include";

    if (session) {
        opts.headers["Authorization"] = session;
    }

    let result = await f(`/${path}`, opts);

    let body;

    try {
        body = await result.json();
    } catch (error) { body = error; }

    if (result.ok) {
        return { ...body, code: result.status };
    } else {
        const err = new Error();
        if (body.message) err.message = body.message;
        err.code = result.status;
        throw err;
    }
}

export function get(path, session, f) {
    return send({ method: 'GET', path, session, f });
}

export function del(path, session, f) {
    return send({ method: 'DELETE', path, session, f });
}

export function post(path, data, session, f) {
    return send({ method: 'POST', path, data, session, f });
}

export function put(path, data, session, f) {
    return send({ method: 'PUT', path, data, session, f });
}

export async function unpack(func) {
    try {
        let res = await func()
        return { res };
    } catch (err) {
        return { err };
    }
}
