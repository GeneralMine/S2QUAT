import { prisma as p } from "$lib/utils/db";
/** @type {import("@prisma/client").PrismaClient} */
const prisma = p;

import { send, fail, isAuthenticatedAs } from "$lib/utils/auth";

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function del(request) {
    const { user } = request.locals;
    if (!isAuthenticatedAs(user, "USER")) {
        return fail(401, "Du verfügst nicht über die benötigte Berechtigung!");
    }

    let id = request.params.pageId;

    if (!id) {
        console.log("No page name was provided!");
        return fail(400, "No page name was provided!");
    }

    try {
        id = parseInt(id);

        await prisma.page.delete({ where: { id } });
        return send({ id });
    } catch (err) {
        console.error("Failed to create page:", err);
        return fail(400, err);
    }
}
