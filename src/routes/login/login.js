import { prisma as p } from "$lib/db";
/** @type {import("@prisma/client").PrismaClient} */
const prisma = p;

import { getValidCookie, fail, forExternal, comparePassword } from "$lib/authUtil";

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function post(request) {
    let { email, password } = request.body;

    if (email == null || email === "" || password == null || password === "") {
        console.error("LOGIN: email or password is null!");

        return fail(400, "Email oder Passwort ist falsch.");
    }

    email = email.trim();

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (user == null || !(await comparePassword(password, user.password))) {
        // if passwords not matching!
        console.error("LOGIN: credentials not matching!");

        return fail(400, "Email oder Passwort falsch.");
    }

    switch (user.status) {
        case "ACTIVE":
            // User is active
            break;
        case "DEACTIVATED":
            // User is deactivated
            console.error("LOGIN: user is deactivated!");
            return fail(410, "Account deaktiviert.");
        case "NOT_VERIFIED":
            // User is not verified  ja der loggt net aus. Wir müssen also in der middleware checken!
            console.error("LOGIN: user is not verified!");
            return fail(403, "Noch nicht freigeschaltet.");
        default:
            // Wtf shouldnt happen lol
            console.error("Unknown error at login.js");
            return fail(418, "Ich bin eine Teekanne.");
    }

    return {
        status: 200,
        headers: {
            'Set-Cookie': getValidCookie(user)
        },
        body: {
            user: forExternal(user)
        }
    }
}