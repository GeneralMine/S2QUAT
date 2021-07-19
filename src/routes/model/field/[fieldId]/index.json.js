import { prisma as p } from "$lib/utils/db";
/** @type {import("@prisma/client").PrismaClient} */
const prisma = p;

import { send, fail, isAuthenticatedAs } from "$lib/utils/auth";

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function get(request) {
    const { user } = request.locals;
    if (!isAuthenticatedAs(user, "USER")) {
        return fail(401, "Du verfügst nicht über die benötigte Berechtigung!");
    }

    let fieldId = request.params.fieldId;

    if (fieldId === undefined) {
        console.log("No field was provided!");
        return fail(400, "Die eindeutige ID des Feldes ist nicht optional.");
    }

    try {
        fieldId = parseInt(fieldId);

        const field = await prisma.field.findUnique({
            where: { id: fieldId },
            include: {
                attributes: {
                    include: {
                        factors: {
                            include: {
                                criterias: true
                            }
                        }
                    }
                }
            }
        });

        return send({ field });
    } catch (err) {
        return fail(400, "Konnte Feld nicht laden. Bitte Eingaben überprüfen!");
    }
}

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function post(request) {
    const { user } = request.locals;
    if (!isAuthenticatedAs(user, "USER")) {
        return fail(401, "Du verfügst nicht über die benötigte Berechtigung!");
    }

    let { name, description, order } = request.body;
    let fieldId = request.params.fieldId;

    if (!name) {
        console.log("No field name was provided!");
        return fail(400, "No field name was provided!");
    }

    let data = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (order) data.order = order;

    try {
        fieldId = parseInt(fieldId);
        const field = await prisma.field.update({
            where: { id: fieldId },
            data,
            include: {
                attributes: {
                    include: {
                        factors: {
                            include: {
                                criterias: true
                            }
                        }
                    }
                }
            }
        });
        return send({ field });
    } catch (err) {
        console.error("Failed to create field:", err);
        return fail(400, err);
    }
}