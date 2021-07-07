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
        if (template) {
            let templateObject = await prisma.template.findUnique({
                where: {
                    id: template
                },
                include: {
                    attributes: true,
                    criterias: true,
                    factors: {
                        include: {
                            criterias: true,
                        }
                    },
                    fields: true
                }
            });

            const pages = templateObject.fields.map(field => {
                return {
                    name: field.name,
                    description: field.description
                }
            });

            const categories = templateObject.attributes.map(attribute => {
                return {
                    name: attribute.name,
                    description: attribute.description
                }
            });

            const questions = templateObject.factors.flatMap(factor => {
                if (factor.criterias.length > 1) {
                    return factor.criterias.map(criteria => (
                        {
                            name: criteria.name,
                            description: criteria.description
                        }
                    ));
                } else {
                    return [{
                        name: factor.name,
                        description: factor.description
                    }];
                }
            });

            data.questions = {
                createMany: { data: questions }
            };
            data.categories = {
                createMany: { data: categories }
            };
            data.pages = {
                createMany: { data: pages }
            };
        }

        let survey = await prisma.survey.create({
            data,
            include: {
                categories: true,
                responses: true,
                pages: true,
                questions: true
            }
        });
        console.log(survey);
        return send({ survey });
    } catch (err) {
        console.error("Failed to create survey:", err);
        return fail(400, err);
    }
}
