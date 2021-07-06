/** @type {import("@prisma/client").PrismaClient} */
import { prisma } from "$lib/db";

import { send, fail, isAuthenticatedAs } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").requestuestHandler} */
export async function get(request) {
    const { user } = request.locals;

    if (!isAuthenticatedAs(user, "USER")) {
        return fail(401, "Du verfügst nicht über die benötigte Berechtigung!");
    }

    let projectId = request.params.projectId;

    if (!projectId) {
        console.log("No id was provided!");
        return fail(400, "No project id provided!");
    }

    try {
        projectId = parseInt(projectId);

        let project = await prisma.project.findUnique(
            {
                include: {
                    company: true,
                    scenarios: true,
                    users: true
                },
                where: {
                    id: projectId
                }
            });

        project.users.map(usr => {
            delete usr.password;
            delete usr.last_logout;
            return usr;
        })

        if (!project.scenarios) {
            project.scenarios = [];
        }

        if (!project.users) {
            project.users = [];
        }

        return send({ project });
    } catch (err) {
        console.error("Failed to load all projects:", err);
        return fail(400, err);
    }
}
