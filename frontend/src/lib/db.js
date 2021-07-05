import { PrismaClient } from "@prisma/client";

/** @type {PrismaClient} db */
export const db = new PrismaClient();