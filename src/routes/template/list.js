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
        let templates = await prisma.template.findMany(
            {
                include: {
                    attributes: true,
                    criterias: true,
                    factors: true,
                    fields: true,
                    surveys: true
                },
            });
        return send({ templates });
    } catch (err) {
        console.error("Failed to load all templates:", err);
        return fail(400, err);
    }
}
