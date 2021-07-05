/** @type {import("@prisma/client").PrismaClient} */
import { prisma } from "$lib/db";

import { send, fail } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").requestuestHandler} */
export async function post(request) {
    let { projectName,
        projectDescription,
        projectGoal,
        company,
        status,
        projectStart,
        projectEnd } = request.body;

    if (!projectName) {
        console.log("No name was provided!");
        return fail(400, "No name provided!");
    }

    try {
        let project = await prisma.project.create(
            {
                data: {
                    name: projectName,
                    description: projectDescription,
                    goal: projectGoal,
                    company: { connect: { id: company } },
                    status,
                    project_start: new Date(Date.parse(projectStart)),
                    project_end: new Date(Date.parse(projectEnd)),
                    users: {
                        connect: {
                            id: request.locals.user.id
                        }
                    }
                }
            });
        return send({ id: project.id });
    } catch (err) {
        console.error("Failed to create project:", err);
        return fail(400, err);
    }
}
