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

    let projectId = request.params.projectId;

    if (!projectId) {
        console.log("No project id was provided!");
        return fail(400, "No project id was provided!");
    }

    try {
        projectId = parseInt(projectId);

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
