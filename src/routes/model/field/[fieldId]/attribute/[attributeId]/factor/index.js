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

    let { name, description, order, attribute, id } = request.body;

    if (!name) {
        console.log("No factor name was provided!");
        return fail(400, "No factor name was provided!");
    }

    let data = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (order) data.order = order;
    if (attribute) data.attribute = { connect: { id: attribute } };

    try {
        let factor;
        let updated = false;
        if (!id) {
            factor = await prisma.factor.create({
                data,
                include: {
                    criterias: true
                }
            });
        } else {
            factor = await prisma.factor.update({ where: { id }, data });
            updated = true;
        }
        return send({ factor, updated });
    } catch (err) {
        console.error("Failed to create factor:", err);
        return fail(400, err);
    }
}