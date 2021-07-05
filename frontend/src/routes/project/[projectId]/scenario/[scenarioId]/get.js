/** @type {import("@prisma/client").PrismaClient} */
import { prisma } from "$lib/db";

import { send, fail } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").requestuestHandler} */
export async function get(request) {
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
                    survey: true
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