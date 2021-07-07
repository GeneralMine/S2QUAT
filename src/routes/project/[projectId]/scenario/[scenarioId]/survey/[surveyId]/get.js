/** @type {import("@prisma/client").PrismaClient} */
import { prisma } from "$lib/db";

import { send, fail, isAuthenticatedAs } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").requestuestHandler} */
export async function get(request) {
    const { user } = request.locals;
    if (!isAuthenticatedAs(user, "USER")) {
        return fail(401, "Du verfügst nicht über die benötigte Berechtigung!");
    }

    let surveyId = request.params.surveyId;

    if (!surveyId) {
        console.log("No id was provided!");
        return fail(400, "No id provided!");
    }

    try {
        surveyId = parseInt(surveyId);

        let survey = await prisma.survey.findUnique(
            {
                include: {
                    categories: true,
                    pages: true,
                    questions: true,
                    responses: true,
                    scenario: true,
                    tempalte: true
                },
                where: {
                    id: surveyId
                }
            });
        return send({ survey });
    } catch (err) {
        console.error("Failed to load all surveys:", err);
        return fail(400, err);
    }
}
