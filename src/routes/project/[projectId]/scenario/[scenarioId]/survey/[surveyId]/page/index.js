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

    let { name, description, order, survey, id } = request.body;

    if (!name) {
        console.log("No page name was provided!");
        return fail(400, "No page name was provided!");
    }

    let data = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (order) data.order = order;
    if (survey) data.survey = { connect: { id: survey } };

    try {
        let page;
        let updated = false;
        if (!id) {
            page = await prisma.page.create({
                data,
                include: {
                    categories: {
                        include: {
                            questions: true
                        }
                    }
                }
            });
        } else {
            page = await prisma.page.update({ where: { id }, data });
            updated = true;
        }
        return send({ page, updated });
    } catch (err) {
        console.error("Failed to create page:", err);
        return fail(400, err);
    }
}