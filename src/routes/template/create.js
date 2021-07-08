import { prisma as p } from "$lib/utils/db";
/** @type {import("@prisma/client").PrismaClient} */
const prisma = p;

import { send, fail, isAuthenticatedAs } from "$lib/utils/auth";

/** @type {import("@sveltejs/kit").requestuestHandler} */
export async function post(request) {
    const { user } = request.locals;
    if (!isAuthenticatedAs(user, "USER")) {
        return fail(401, "Du verfügst nicht über die benötigte Berechtigung!");
    }

    let { templateName } = request.body;

    if (!templateName) {
        console.log("No name was provided!");
        return fail(400, "No template name was provided!");
    }

    let data = {};
    if (templateName) data.name = templateName;

    try {
        let template = await prisma.template.create({ data });
        return send({ template });
    } catch (err) {
        console.error("Failed to create template:", err);
        return fail(400, err);
    }
}
