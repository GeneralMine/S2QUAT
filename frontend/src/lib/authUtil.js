import * as cookie from "cookie";
import ms from "ms";

import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export function getValidCookie(user) {
    return [cookie.serialize("token", getToken(user), {
        domain: ".localhost",
        maxAge: ms("7d"),
        sameSite: "lax",
        secure: false,
        path: "/"
    })];
}

export function getInvalidCookie() {
    return [cookie.serialize("token", 42, {
        domain: ".localhost",
        maxAge: 0,
        sameSite: "lax",
        secure: false,
        path: "/"
    })];
}

export function fail(code, message) {
    return {
        status: code,
        body: {
            error: message
        }
    }
}

export function forExternal({ id, email, name, last_logout, status, role, }) {
    return {
        id,
        email,
        name,
        last_logout,
        status,
        role,
    }
}

export function getToken(user) {
    return sign(forExternal(user), process.env["TOKEN_SECRET"]);
}

export async function comparePassword(firstPassword, secondPassword) {
    return await compare(firstPassword, secondPassword);
}

export async function hashPassword(password) {
    return await hash(password, 10);
}