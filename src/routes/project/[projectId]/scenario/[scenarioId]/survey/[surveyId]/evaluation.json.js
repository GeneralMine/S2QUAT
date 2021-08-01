import { prisma as p } from "$lib/utils/db";
/** @type {import("@prisma/client").PrismaClient} */
const prisma = p;

import { send, fail, isAuthenticatedAs } from "$lib/utils/auth";
import { absoluteFrequency, average, lowerQuartile, max, median, min, modus, relativeFrequency, upperQuartile, variance } from "$lib/utils/statistics";

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
        let survey = await prisma.survey.findUnique({
            include: {
                categories: true,
                pages: {
                    include: {
                        categories: {
                            include: {
                                questions: {
                                    include: {
                                        criteria: true,
                                        factor: true
                                    }
                                }
                            }
                        }
                    }
                },
                questions: {
                    include: {
                        criteria: {
                            include: {
                                factor: {
                                    include: {
                                        attribute: {
                                            include: {
                                                field: true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        factor: {
                            include: {
                                attribute: {
                                    include: {
                                        field: true
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    include: {
                        testperson: true,
                        user: true,
                        answers: true
                    }
                }
            },
            where: {
                id: surveyId
            }
        });

        let fieldIds = survey.questions.map(el => {
            if (el.factor)
                return el.factor.attribute.fieldId;
            else
                return el.criteria.factor.attribute.fieldId;
        }).filter(el => el);
        let attributeIds = survey.questions.map(el => {
            if (el.factor)
                return el.factor.attributeId;
            else
                return el.criteria.factor.attributeId;
        }).filter(el => el);
        let factorIds = survey.questions.map(el => el.factorId).filter(el => el);
        let criteriaIds = survey.questions.map(el => el.criteriaId).filter(el => el);
        let questionIds = survey.questions.map(el => el.id).filter(el => el);

        // 1: Build tree based on model

        let evaluation = await prisma.field.findMany({
            where: {
                id: { in: fieldIds }
            },
            include: {
                attributes: {
                    where: {
                        id: { in: attributeIds }
                    },
                    include: {
                        factors: {
                            where: {
                                OR: [
                                    {
                                        id: { in: factorIds }
                                    },
                                    {
                                        criterias: {
                                            some: {
                                                questions: {
                                                    some: {
                                                        id: { in: questionIds }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                ]
                            },
                            include: {
                                questions: {
                                    where: {
                                        id: { in: questionIds }
                                    }
                                },
                                criterias: {
                                    where: {
                                        OR: [
                                            {
                                                id: { in: criteriaIds }
                                            },
                                            {
                                                questions: {
                                                    some: {
                                                        id: { in: questionIds }
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    include: {
                                        questions: {
                                            where: {
                                                id: { in: questionIds }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                order: "asc"
            }
        });

        // 2: Merge with questions
        for (const question of survey.questions) {
            // data to collect for each question.
            // Only score right now!
            if (question.type === "SCORE" || question.type === "SCORE_TEXT") {
                let data = [];
                for (const response of survey.responses) {
                    for (const answer of response.answers) {
                        // check if the answer is for this question
                        if (answer.questionId === question.id && answer.score) {
                            data.push(answer.score);
                        }
                    }
                }

                // sort
                data.sort();

                for (const field of evaluation) {
                    // find field
                    if ((question.criteria && question.criteria.factor.attribute.fieldId === field.id) || (question.factor && question.factor.attribute.fieldId === field.id)) {
                        for (const attribute of field.attributes) {
                            // find attribute
                            if ((question.criteria && question.criteria.factor.attributeId === attribute.id) || (question.factor && question.factor.attributeId === attribute.id)) {
                                for (const factor of attribute.factors) {
                                    // find factor
                                    if ((question.criteria && question.criteria.factorId === factor.id) || (question.factor && question.factorId === factor.id)) {
                                        if (factor.questions.length > 0) {
                                            factor.question = factor.questions[0];
                                            delete factor.questions;
                                            factor.question.data = data;
                                            factor.question.absoluteFrequency = absoluteFrequency(data);
                                            factor.question.relativeFrequency = relativeFrequency(data);
                                            factor.question.average = average(data);
                                            factor.question.median = median(data);
                                            factor.question.modus = modus(data);
                                            factor.question.variance = variance(data);
                                            factor.question.min = min(data);
                                            factor.question.max = max(data);
                                            factor.question.lowerQuartile = lowerQuartile(data);
                                            factor.question.upperQuartile = upperQuartile(data);
                                            factor.question.n = data.length;
                                        } else {
                                            for (const criteria of factor.criterias) {
                                                // find criteria
                                                if (question.criteriaId === criteria.id) {
                                                    criteria.question = criteria.questions[0];
                                                    delete criteria.questions;
                                                    criteria.question.data = data;
                                                    criteria.question.absoluteFrequency = absoluteFrequency(data);
                                                    criteria.question.relativeFrequency = relativeFrequency(data);
                                                    criteria.question.average = average(data);
                                                    criteria.question.median = median(data);
                                                    criteria.question.modus = modus(data);
                                                    criteria.question.variance = variance(data);
                                                    criteria.question.min = min(data);
                                                    criteria.question.max = max(data);
                                                    criteria.question.lowerQuartile = lowerQuartile(data);
                                                    criteria.question.upperQuartile = upperQuartile(data);
                                                    criteria.question.n = data.length;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return send({ survey, evaluation });
    } catch (err) {
        console.error("Failed to load evaluation of survey:", err);
        return fail(400, err);
    }
}
