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

    let templateId = request.params.templateId;

    if (!templateId) {
        console.log("No id was provided!");
        return fail(400, "No template id provided!");
    }

    try {
        templateId = parseInt(templateId);

        let template = await prisma.template.findUnique(
            {
                include: {
                    attributes: true,
                    criterias: true,
                    factors: true,
                    fields: true,
                    surveys: true
                },
                where: {
                    id: templateId
                }
            });

        return send({ template });
    } catch (err) {
        console.error("Failed to load all templates:", err);
        return fail(400, err);
    }
}
