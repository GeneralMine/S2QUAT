import { prisma as p } from "$lib/db";
/** @type {import("@prisma/client").PrismaClient} */
const prisma = p;

import { send, fail, isAuthenticatedAs } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function post(request) {
    const { user } = request.locals;
    if (!isAuthenticatedAs(user, "USER")) {
        return fail(401, "Du verfügst nicht über die benötigte Berechtigung!");
    }

    let { name, description, order, survey, category, type, typeOptions, id } = request.body;

    if (!name) {
        console.log("No question name was provided!");
        return fail(400, "No question name was provided!");
    }

    let data = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (order) data.order = order;
    if (type) data.type = type;
    if (typeOptions) data.typeOptions = typeOptions;
    if (survey) data.survey = { connect: { id: survey } };
    if (category) data.category = { connect: { id: category } };

    try {
        let question;
        let updated = false;
        if (!id) {
            question = await prisma.question.create({
                data,
            });
        } else {
            question = await prisma.question.update({ where: { id }, data });
            updated = true;
        }
        return send({ question, updated });
    } catch (err) {
        console.error("Failed to create question:", err);
        return fail(400, err);
    }
}