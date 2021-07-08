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

    let { name, description, order, survey, page, id } = request.body;

    if (!name) {
        console.log("No category name was provided!");
        return fail(400, "No category name was provided!");
    }

    let data = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (order) data.order = order;
    if (survey) data.survey = { connect: { id: survey } };
    if (page) data.page = { connect: { id: page } };

    try {
        let category;
        let updated = false;
        if (!id) {
            category = await prisma.category.create({
                data,
                include: {
                    questions: true
                }
            });
        } else {
            category = await prisma.category.update({ where: { id }, data });
            updated = true;
        }
        return send({ category, updated });
    } catch (err) {
        console.error("Failed to create category:", err);
        return fail(400, err);
    }
}