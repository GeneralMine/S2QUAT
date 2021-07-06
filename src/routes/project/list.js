/** @type {import("@prisma/client").PrismaClient} */
import { prisma } from "$lib/db";

import { send, fail, isAuthenticatedAs } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").requestuestHandler} */
export async function get(request) {
    const { user } = request.locals;

    if (!isAuthenticatedAs(user, "USER")) {
        return fail(401, "Du verfügst nicht über die benötigte Berechtigung!");
    }

    let { id: userId } = user;

    try {
        userId = parseInt(userId);

        let projects = await prisma.project.findMany({
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
