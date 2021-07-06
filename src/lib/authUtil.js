import * as cookie from "cookie";
import ms from "ms";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const COOKIE_DOMAIN = process.env["COOKIE_DOMAIN"];

export const roles = {
    USER: 'USER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
};


/**
 * Returns true if 
 * @param {import("@prisma/client").User | string} user 
 * @param {import("@prisma/client").UserRole | string} role 
 * @returns {boolean}
 */
/*
export function isAuthenticatedAs(user, role) {
    const hierachy = ["USER", "EDITOR", "ADMIN"];

    const allowed = () => hierachy.indexOf(a) >= hierachy.indexOf(role) && hierachy.indexOf(role) !== -1;

    if (typeof user.role === "string") {
        return allowed(user.role);
    } else if (typeof user === "string") {
        return allowed(user);
    }

    console.error("Please have a look at lib/authUtil.js! Encountered unexpected behaviour!", { user, role });
    return false;
}
*/

/**
 * I would recommend this function even though it doesn't return anything. Just for the sake of readability.
 * @returns {undefined} nothing
 */
export function politely_ask_to_back_off() {
    return;
}

export function getValidCookie(user) {
    return [cookie.serialize("token", getToken(user), {
        domain: COOKIE_DOMAIN,
        maxAge: ms("7d"),
        sameSite: "lax",
        secure: false,
        path: "/"
    })];
}

export function getInvalidCookie() {
    return [cookie.serialize("token", 42, {
        domain: COOKIE_DOMAIN,
        maxAge: 0,
        sameSite: "lax",
        secure: false,
        path: "/"
    })];
}

export function send(data) {
    return {
        status: 200,
        body: data
    }
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
    return jwt.sign(forExternal(user), process.env["TOKEN_SECRET"]);
}

export async function comparePassword(firstPassword, secondPassword) {
    return await bcrypt.compare(firstPassword, secondPassword);
}

export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}