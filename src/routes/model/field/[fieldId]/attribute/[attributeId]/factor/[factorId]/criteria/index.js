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

    let { name, description, order, factor, id } = request.body;

    if (!name) {
        console.log("No criteria name was provided!");
        return fail(400, "No criteria name was provided!");
    }

    let data = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (order) data.order = order;
    if (factor) data.factor = { connect: { id: factor } };

    try {
        let criteria;
        let updated = false;
        if (!id) {
            criteria = await prisma.criteria.create({ data, });
        } else {
            criteria = await prisma.criteria.update({ where: { id }, data });
            updated = true;
        }
        return send({ criteria, updated });
    } catch (err) {
        console.error("Failed to create criteria:", err);
        return fail(400, err);
    }
}
