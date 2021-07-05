/** @type {import("@prisma/client").PrismaClient} */
import { prisma } from "$lib/db";

import { send, fail } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").requestuestHandler} */
export async function get(request) {
    let fieldId = request.params.fieldId;

    if (fieldId === undefined) {
        console.log("No user was provided!");
        return fail(400, "No user provided!");
    }

    try {
        fieldId = parseInt(fieldId);

        const field = await prisma.field.findUnique({ where: { id: fieldId }, include: { attributes: { include: { factors: { include: { criterias: true } } } } } });

        return send({ field });
    } catch (err) {
        console.error("Failed to load all projects:", err);
        return fail(400, err);
    }
}
