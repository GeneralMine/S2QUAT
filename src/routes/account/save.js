import { prisma as p } from "$lib/utils/db";
/** @type {import("@prisma/client").PrismaClient} */
const prisma = p;

import { forExternal, getValidCookie, hashPassword, fail, isAuthenticatedAs } from "$lib/utils/auth";

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function post(request) {
    const { user } = request.locals;
    if (!isAuthenticatedAs(user, "USER")) {
        return fail(401, "Du verfügst nicht über die benötigte Berechtigung!");
    }

    let { name, email, password } = request.body;

    try {
        let current_user = request.locals.user;
        let data = {};
        if (name) data.name = name;
        if (email) data.email = email;
        if (password) data.password = await hashPassword(password);

        const updatedUser = await prisma.user.update({ where: { id: current_user.id }, data });

        return {
            status: 200,
            headers: {
                'Set-Cookie': getValidCookie(updatedUser)
            },
            body: {
                user: forExternal(updatedUser)
            }
        };
    } catch (err) {
        console.error("while trying to update:", err);
        return fail(401, "Das Ändern der Daten ist fehlgeschlagen! Bitte Eingaben prüfen.");
    }
}
