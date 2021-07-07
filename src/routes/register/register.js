import { prisma as p } from "$lib/db";
/** @type {import("@prisma/client").PrismaClient} */
const prisma = p;

import { fail, hashPassword } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function post(request) {
    let { name, password, email } = request.body;
    name = name.trim();
    email = email.trim();

    if (name == null || name === "" || password == null || password === "" || email == null || email === "") {
        return fail(400, "Invalid input!");
    }

    try {
        const hashedPassword = await hashPassword(password);
        const createdUser = await prisma.user.create({
            data: {
                name,
                password: hashedPassword,
                email,
            }
        });
        console.log("Successfully created user" + createdUser.id);
        return {
            status: 200,
            body: {
                id: createdUser.id
            }
        }
    } catch (err) {
        console.log(err)
        return fail(500, "Internal server error while register");
    }
}