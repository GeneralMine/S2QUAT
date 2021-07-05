/** @type {import("@prisma/client").PrismaClient} */
import { prisma } from "$lib/db";

import { send, fail } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").requestuestHandler} */
export async function get() {
    try {
        let templates = await prisma.template.findMany(
            {
                include: {
                    attributes: true,
                    criteria: true,
                    factors: true,
                    fields: true,
                    survey: true
                },
            });
        return send({ templates });
    } catch (err) {
        console.error("Failed to load all templates:", err);
        return fail(400, err);
    }
}
