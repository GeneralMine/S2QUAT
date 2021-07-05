/** @type {import("@prisma/client").PrismaClient} */
import { prisma } from "$lib/db";

import { send, fail } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").requestuestHandler} */
export async function get(request) {
    let userId = request.locals.user.id;

    if (!userId) {
        console.log("No id was provided!");
        return fail(400, "No id provided!");
    }

    try {
        userId = parseInt(userId);

        let projects = await prisma.project.findMany(
            {
                include: {
                    company: true,
                    scenarios: true,
                    users: true
                },
                where: {
                    users: {
                        some: {
                            id: userId
                        }
                    }
                }
            });
        projects = projects.map(el => {
            el.users.map(usr => {
                delete usr.password;
                delete usr.last_logout;
                return usr;
            })
            return el;
        });
        return send({ projects });
    } catch (err) {
        console.error("Failed to load all projects:", err);
        return fail(400, err);
    }
}
