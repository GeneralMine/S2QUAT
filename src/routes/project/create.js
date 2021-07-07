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
        goal,
        company,
        status,
        projectStart,
        projectEnd } = request.body;

    if (!name) {
        console.log("No name was provided!");
        return fail(400, "No project name was provided!");
    }

    let data = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (goal) data.goal = goal;
    if (company) data.company = { connect: { id: company } };
    if (status) data.status = status;
    if (projectStart) data.start = new Date(Date.parse(projectStart));
    if (projectEnd) data.end = new Date(Date.parse(projectEnd));

    console.log("Project/Create:", data);

    data.users = {
        connect: {
            id: request.locals.user.id
        }
    };

    try {
        let project = await prisma.project.create({ data });
        project.scenarios = [];
        project.users = [];
        project.company = null;

        return send({ project });
    } catch (err) {
        console.error("Failed to create project:", err);
        return fail(400, err);
    }
}
