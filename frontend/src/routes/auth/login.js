/** @type {import("@prisma/client").PrismaClient} */
import { db as prisma } from "$lib/db";

import ms from "ms";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import * as cookie from "cookie";

import { forExternal } from "$lib/util";

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

    if (user == null || !(await compare(password, user.password))) {
        // if passwords not matching!
        console.error("LOGIN: credentials not matching!");

        return fail(400, "Email oder Passwort ist falsch.");
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
            return fail(403, "Nicht freigeschaltet.");
        default:
            // Wtf shouldnt happen lol
            console.error("Unknown error at routes/auth/login.js");
            return fail(418, "Ich bin eine Teekanne.");
    }

    //TODO: create jwt
    //TODO: store jwt in cookie
    //TODO: test
    //TODO: move all other endpoints to frontend

    const token = sign(forExternal(user), process.env["TOKEN_SECRET"]);

    return {
        status: 200,
        headers: {
            'Set-Cookie': [cookie.serialize("token", token, {
                domain: ".localhost",
                maxAge: ms("7d"),
                sameSite: "lax",
                secure: false,
                path: "/"
            })]
        },
        body: {
            user: forExternal(user)
        }
    }
}

function fail(code, message) {
    return {
        status: code,
        body: {
            message
        }
    }
}
