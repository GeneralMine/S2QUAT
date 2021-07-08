import { prisma as p } from "$lib/utils/db";
/** @type {import("@prisma/client").PrismaClient} */
const prisma = p;

import { send, fail, isAuthenticatedAs } from "$lib/utils/auth";

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function post(request) {
    const { user } = request.locals;
    if (!isAuthenticatedAs(user, "USER")) {
        return fail(401, "Du verfügst nicht über die benötigte Berechtigung!");
    }

    let { name, description, project } = request.body;

    if (!name) {
        console.log("No name was provided!");
        return fail(400, "No scenario name was provided!");
    }

    let data = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (project) data.project = { connect: { id: project } };

    try {
        let scenario = await prisma.scenario.create({ data });
        scenario.surveys = [];

        return send({ scenario });
    } catch (err) {
        console.error("Failed to create scenario:", err);
        return fail(400, err);
    }
}
