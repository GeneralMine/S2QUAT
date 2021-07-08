import { prisma as p } from "$lib/utils/db";
/** @type {import("@prisma/client").PrismaClient} */
const prisma = p;

import { send, fail, isAuthenticatedAs } from "$lib/utils/auth";

/** @type {import("@sveltejs/kit").requestuestHandler} */
export async function get(request) {
    const { user } = request.locals;
    if (!isAuthenticatedAs(user, "USER")) {
        return fail(401, "Du verfügst nicht über die benötigte Berechtigung!");
    }

    try {
        let companies = await prisma.company.findMany(
            {
                include: {
                    projects: true
                },
            });
        return send({ companies });
    } catch (err) {
        console.error("Failed to load all companies:", err);
        return fail(400, err);
    }
}
