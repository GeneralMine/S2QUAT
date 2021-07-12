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

    let { survey,
        testperson,
        location,
        feedback,
        answers } = request.body;

    if (!testperson.name || !testperson.signature) {
        console.log("No name or signature was provided!");
        return fail(400, "No survey name or signature was provided!");
    }

    try {
        // Create Testperson
        let testpersonData = {};
        testpersonData.name = testperson.name;
        testpersonData.signature = testperson.signature;
        testpersonData.age = testperson.age;
        testpersonData.testPersonSex = testperson.gender;
        const testpersonObject = await prisma.testperson.create({ data: testpersonData });

        // Create Response
        let responseData = {};
        if (survey) responseData.survey = { connect: { id: survey } };
        if (location) responseData.location = location;
        if (feedback) responseData.feedback = feedback;
        responseData.user = { connect: { id: user.id } };
        responseData.testperson = { connect: { id: testpersonObject.id } };
        const response = await prisma.response.create({ data: responseData });

        // Create Questions
        for (const answer of answers) {
            answer.question = { connect: { id: answer.question } };
            answer.response = { connect: { id: response.id } };
            await prisma.answer.create({ data: answer });
        }

        return send({ response });
    } catch (err) {
        console.error("Failed to create survey:", err);
        return fail(400, err);
    }
}
