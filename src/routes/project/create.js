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
        return fail(400, "No project name was provided!");
    }

    let data = {};
    if (projectName) data.name = projectName;
    if (projectDescription) data.description = projectDescription;
    if (projectGoal) data.goal = projectGoal;
    if (company) data.company = { connect: { id: company } };
    if (status) data.status = status;
    if (projectStart) data.project_start = new Date(Date.parse(projectStart));
    if (projectEnd) data.project_end = new Date(Date.parse(projectEnd));

    console.log("Project/Create:", data);

    data.users = {
        connect: {
            id: request.locals.user.id
        }
    };

    try {
        let project = await prisma.project.create({ data });
        return send({ project });
    } catch (err) {
        console.error("Failed to create project:", err);
        return fail(400, err);
    }
}
