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

    let scenarioId = request.params.scenarioId;

    if (!scenarioId) {
        console.log("No id was provided!");
        return fail(400, "No id provided!");
    }

    try {
        scenarioId = parseInt(scenarioId);

        let scenario = await prisma.scenario.findUnique(
            {
                include: {
                    surveys: {
                        orderBy: {
                            order: "asc"
                        }
                    }
                },
                where: {
                    id: scenarioId
                }
            });
        return send({ scenario });
    } catch (err) {
        console.error("Failed to load all scenarios:", err);
        return fail(400, err);
    }
}
