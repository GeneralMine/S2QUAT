/** @type {import("@prisma/client").PrismaClient} */
import { prisma } from "$lib/db";

import { send, fail } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").requestuestHandler} */
export async function get() {
    try {
        let companies = await prisma.company.findMany(
            {
                include: {
                    projects: true
                },
            });
        return send({ companies });
    } catch (err) {
        console.error("Failed to load all companies:", err);
        return fail(400, err);
    }
}