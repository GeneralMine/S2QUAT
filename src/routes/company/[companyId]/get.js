import { prisma as p } from "$lib/db";
/** @type {import("@prisma/client").PrismaClient} */
const prisma = p;

import { send, fail, isAuthenticatedAs } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").requestuestHandler} */
export async function get(request) {
    const { user } = request.locals;
    if (!isAuthenticatedAs(user, "USER")) {
        return fail(401, "Du verfügst nicht über die benötigte Berechtigung!");
    }

    let companyId = request.params.companyId;

    if (!companyId) {
        console.log("No id was provided!");
        return fail(400, "No company id provided!");
    }

    try {
        companyId = parseInt(companyId);

        let company = await prisma.company.findUnique(
            {
                include: {
                    projects: true,
                },
                where: {
                    id: companyId
                }
            });

        return send({ company });
    } catch (err) {
        console.error("Failed to load all companys:", err);
        return fail(400, err);
    }
}
