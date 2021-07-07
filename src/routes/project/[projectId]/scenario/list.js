/** @type {import("@prisma/client").PrismaClient} */
import { prisma } from "$lib/db";

import { send, fail, isAuthenticatedAs } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").requestuestHandler} */
export async function get(request) {
    const { user } = request.locals;
    if (!isAuthenticatedAs(user, "USER")) {
        return fail(401, "Du verfügst nicht über die benötigte Berechtigung!");
    }

    try {
        const projectId = parseInt(request.params.projectId);

        let scenarios = await prisma.scenario.findMany({
            include: {
                surveys: true
            },
            where: {
                projectId
            }
        });

        return send({ scenarios });
    } catch (err) {
        console.error("Failed to load all scenarios:", err);
        return fail(400, err);
    }
}
