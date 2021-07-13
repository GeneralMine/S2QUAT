import { prisma as p } from "$lib/utils/db";
/** @type {import("@prisma/client").PrismaClient} */
const prisma = p;

import { send, fail, isAuthenticatedAs } from "$lib/utils/auth";

/** @type {import("@sveltejs/kit").requestuestHandler} */
export async function get(request) {
    const { user } = request.locals;
    if (!isAuthenticatedAs(user, "USER")) {
        return fail(401, "Du verfügst nicht über die benötigte Berechtigung!");
    }

    let responseId = request.params.responseId;

    if (!responseId) {
        console.log("No response id was provided!");
        return fail(400, "No response id provided!");
    }

    try {
        responseId = parseInt(responseId);

        let response = await prisma.response.findUnique(
            {
                include: {
                    testperson: true,
                    user: true,
                    answers: {
                        include: {
                            question: true
                        }
                    }
                },
                where: {
                    id: responseId
                }
            });
        return send({ response });
    } catch (err) {
        console.error("Failed to load all responses:", err);
        return fail(400, err);
    }
}
