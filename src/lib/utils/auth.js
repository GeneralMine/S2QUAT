import * as cookie from "cookie";
import ms from "ms";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const COOKIE_DOMAIN = process.env["COOKIE_DOMAIN"];
const isSecure = COOKIE_DOMAIN !== ".localhost";

/**
 * Returns true if 
 * @param {import("@prisma/client").User | string} user 
 * @param {import("@prisma/client").UserRole | string} role 
 * @returns {boolean}
 */
export function isAuthenticatedAs(user = "", role) {
    const hierachy = ["USER", "EDITOR", "ADMIN"];

    const allowed = (a) => {
        const isAllowed = hierachy.indexOf(a) >= hierachy.indexOf(role) && hierachy.indexOf(role) !== -1;
        //console.log(`${a}:${hierachy.indexOf(a)} ${role}${hierachy.indexOf(role)} ${hierachy.indexOf(role) !== -1}`);
        return isAllowed;
    };

    if (typeof user.role === "string") {
        return allowed(user.role);
    } else if (typeof user === "string") {
        return allowed(user);
    }

    console.error("Please have a look at lib/authUtil.js! Encountered unexpected behaviour!", { user, role });
    return false;
}

export function getValidCookie(user) {
    return [cookie.serialize("token", getToken(user), {
        domain: COOKIE_DOMAIN,
        maxAge: ms("7d"),
        sameSite: "lax",
        secure: isSecure,
        path: "/"
    })];
}

export function getInvalidCookie() {
    return [cookie.serialize("token", 42, {
        domain: COOKIE_DOMAIN,
        maxAge: 0,
        sameSite: "lax",
        secure: isSecure,
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

export function forExternal({ id, email, name, lastLogout, status, role, }) {
    return {
        id,
        email,
        name,
        lastLogout,
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