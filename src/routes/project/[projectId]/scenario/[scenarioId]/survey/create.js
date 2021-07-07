/** @type {import("@prisma/client").PrismaClient} */
import { prisma } from "$lib/db";

import { send, fail, isAuthenticatedAs } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function post(request) {
    const { user } = request.locals;
    if (!isAuthenticatedAs(user, "USER")) {
        return fail(401, "Du verfügst nicht über die benötigte Berechtigung!");
    }

    let { name,
        description,
        order,
        status,
        template,
        scenario } = request.body;

    if (!name) {
        console.log("No name was provided!");
        return fail(400, "No survey name was provided!");
    }

    let data = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (order) data.order = parseInt(order);
    if (status) data.status = status;
    if (scenario) data.scenario = { connect: { id: scenario } };
    if (template) data.template = { connect: { id: template } };

    try {
        let survey = await prisma.survey.create({ data });
        survey.surveys = [];
        survey.responses = [];
        survey.pages = [];
        survey.categories = [];
        survey.questions = [];

        return send({ survey });
    } catch (err) {
        console.error("Failed to create survey:", err);
        return fail(400, err);
    }
}
