import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import { prisma } from "$lib/db";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
    try {
        const cookies = parse(request.headers.cookie || '');

        let my_cookie;


        if (my_cookie !== undefined) {
            my_cookie = cookies.token;
        } else if (request.headers["Authorization"] !== undefined) {
            my_cookie = request.headers["Authorization"];
        } else {
            console.log("Token missing in both cookie and authorization header", cookies);
            return await resolve(request);
        }

        const decoded = verify(my_cookie, process.env["TOKEN_SECRET"]);

        let my_user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (my_user.last_logout.valueOf() / 1000 < decoded.iat) {
            request.locals.user = decoded;
            request.locals.token_cookie = my_cookie;
        }
    } catch (err) { console.error("error in handle hook", err); }

    return await resolve(request);
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession({ locals }) {
    return {
        user: locals.user && {
            id: locals.user.id,
            name: locals.user.name,
            email: locals.user.email,
            role: locals.user.role,
            status: locals.user.status,
            last_logout: locals.user.last_logout,
            token: locals.token_cookie,
        }
    };
}

export function serverFetch(request) {
    return fetch(new Request("http://localhost:3000" + request.url, request));
}