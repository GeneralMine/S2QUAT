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
        console.log(fieldIds);
        let attributeIds = survey.questions.map(el => {
            if (el.factor)
                return el.factor.attributeId;
            else
                return el.criteria.factor.attributeId;
        }).filter(el => el);
        let factorIds = survey.questions.map(el => el.factorId).filter(el => el);
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
                                        questions: {
                                            some: {
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
                    for (const attribute of field.attributes) {
                        for (const factor of attribute.factors) {
                            for (const ques of factor.questions) {
                                ques.absoluteFrequency = absoluteFrequency(data);
                                ques.relativeFrequency = relativeFrequency(data);
                                ques.average = average(data);
                                ques.median = median(data);
                                ques.modus = modus(data);
                                ques.variance = variance(data);
                                ques.min = min(data);
                                ques.max = max(data);
                                ques.lowerQuartile = lowerQuartile(data);
                                ques.upperQuartile = upperQuartile(data);
                                ques.n = data.length;
                            }
                        }
                    }
                }
            }
        }

        return send({ survey, evaluation });
    } catch (err) {
        console.error("Failed to load all surveys:", err);
        return fail(400, err);
    }
}
