/** @type {import("@prisma/client").PrismaClient} */
import { prisma } from "$lib/db";

import { getInvalidCookie, fail } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function post(request) {
    let { user } = request.locals;

    if (user === undefined) {
        console.error("LOGOUT: req.user is null!", request);
        return fail(401, "No user in request!");
    }

    try {
        await prisma.user.update({ where: { id: user.id }, data: { last_logout: new Date() } });

        console.log("LOGOUT: User " + user.name + " logged out successfully!");
        return {
            status: 200,
            headers: {
                'Set-Cookie': getInvalidCookie()
            },
            body: {}
        }
    } catch (err) {
        console.error(`CRITICAL! User ${user.name} could not be logged out!`, err);
        return {
            status: 500,
            headers: {
                'Set-Cookie': getInvalidCookie()
            },
            body: {}
        };
    }
}