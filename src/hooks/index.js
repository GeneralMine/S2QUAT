import { parse } from "cookie";
import jwt from "jsonwebtoken";
import { prisma } from "$lib/db";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
    console.log(`${request.method} ${request.path}`);
    try {
        const cookies = parse(request.headers.cookie || '');

        let my_cookie;

        if (cookies.token !== undefined) {
            my_cookie = cookies.token;
        } else if (request.headers["Authorization"] !== undefined) {
            my_cookie = request.headers["Authorization"];
        } else {
            console.log("Token missing in both cookie and authorization header");
            return await resolve(request);
        }

        const decoded = jwt.verify(my_cookie, process.env["TOKEN_SECRET"]);

        let my_user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (my_user.lastLogout.valueOf() / 1000 < decoded.iat) {
            request.locals.user = decoded;
            request.locals.token_cookie = my_cookie;
        }

    } catch (err) { console.error("error in handle hook", err); }

    return await resolve(request);
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession({ locals }) {
    const data = {};

    if (locals.user) {
        data.user = {
            id: locals.user.id,
            name: locals.user.name,
            email: locals.user.email,
            role: locals.user.role,
            status: locals.user.status,
            lastLogout: locals.user.lastLogout,
        };
    }

    if (locals.token_cookie) {
        data.token = locals.token_cookie;
    }

    return data;
}

/** @type {import('@sveltejs/kit').ServerFetch} */
export async function serverFetch(request) {
    console.log(`serverfetch: ${request.url} -> ${"http://localhost:3000/" + request.url}`)
    request = new Request("http://localhost:3000/" + request.url, request);
    return fetch(request);
}