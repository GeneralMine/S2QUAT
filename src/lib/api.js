const base = '';

async function send({ method, path, data, session, f = fetch }) {
    const opts = { method, headers: {} };

    if (data) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(data);
    }

    opts.credentials = "include";

    if (session) {
        console.log("setting auth header", session);
        opts.headers["Authorization"] = session;
    }

    // TODO: Fix error handling here! In case of 401 no data was returned so the json parsing fails and throws an error!
    let result = await f(`${base}/${path}`, opts);

    try {
        return await result.json();
    } catch (error) {
        return undefined;
    }
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

export async function unpack(func) {
    try {
        let res = await func()
        return { res };
    } catch (err) {
        return { err };
    }
}
