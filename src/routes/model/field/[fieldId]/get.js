/** @type {import("@prisma/client").PrismaClient} */
import { prisma } from "$lib/db";

import { send, fail } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function get(request) {
    let fieldId = request.params.fieldId;

    if (fieldId === undefined) {
        console.log("No field was provided!");
        return fail(400, "Die eindeutige ID des Feldes ist nicht optional.");
    }

    try {
        fieldId = parseInt(fieldId);

        const field = await prisma.field.findUnique({ where: { id: fieldId }, include: { attributes: { include: { factors: { include: { criterias: true } } } } } });

        return send({ field });
    } catch (err) {
        return fail(400, "Konnte Feld nicht laden. Bitte Eingaben überprüfen!");
    }
}