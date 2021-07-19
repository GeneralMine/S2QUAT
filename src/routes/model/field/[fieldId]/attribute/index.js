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

    let { name, description, order, field, id } = request.body;

    if (!name) {
        console.log("No attribute name was provided!");
        return fail(400, "No attribute name was provided!");
    }

    let data = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (order) data.order = order;
    if (field) data.field = { connect: { id: field } };

    try {
        let attribute;
        let updated = false;
        if (!id) {
            attribute = await prisma.attribute.create({
                data,
                include: {
                    factors: {
                        include: {
                            criterias: true
                        }
                    }
                }
            });
        } else {
            attribute = await prisma.attribute.update({ where: { id }, data });
            updated = true;
        }
        return send({ attribute, updated });
    } catch (err) {
        console.error("Failed to create attribute:", err);
        return fail(400, err);
    }
}