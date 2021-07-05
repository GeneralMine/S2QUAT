/** @type {import("@prisma/client").PrismaClient} */
import { prisma } from "$lib/db";

import { forExternal, getValidCookie, hashPassword, fail } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function post(request) {
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
        return fail(401, "Error while trying to update" + err);
    }
}
