/** @type {import("@prisma/client").PrismaClient} */
import { prisma } from "$lib/db";

import { send, fail } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").requestuestHandler} */
export async function post(request) {
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
