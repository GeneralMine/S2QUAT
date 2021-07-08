import { prisma as p } from "$lib/db";
/** @type {import("@prisma/client").PrismaClient} */
const prisma = p;

import { send, fail, isAuthenticatedAs } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function del(request) {
    const { user } = request.locals;
    if (!isAuthenticatedAs(user, "USER")) {
        return fail(401, "Du verfügst nicht über die benötigte Berechtigung!");
    }

    let id = request.params.categoryId;

    if (!id) {
        console.log("No category name was provided!");
        return fail(400, "No category name was provided!");
    }

    try {
        id = parseInt(id);

        await prisma.category.delete({ where: { id } });
        return send({ id });
    } catch (err) {
        console.error("Failed to create category:", err);
        return fail(400, err);
    }
}
