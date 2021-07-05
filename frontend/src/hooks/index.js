import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import { prisma } from "$lib/db";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
    try {
        const cookies = parse(request.headers.cookie || '');

        if (cookies.token === undefined) {
            console.log("cookie token undefined!", cookies);
            return await resolve(request);
        }

        const decoded = verify(cookies.token, process.env["TOKEN_SECRET"]);

        let my_user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (my_user.last_logout.valueOf() / 1000 < decoded.iat) {
            request.locals.user = decoded;
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
        }
    };
}
