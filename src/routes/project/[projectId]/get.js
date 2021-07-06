/** @type {import("@prisma/client").PrismaClient} */
import { prisma } from "$lib/db";

import { send, fail } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").requestuestHandler} */
export async function get(request) {
    let projectId = request.params.projectId;

    if (!projectId) {
        console.log("No id was provided!");
        return fail(400, "No id provided!");
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
