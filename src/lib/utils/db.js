import * as Prisma from '@prisma/client';
console.log(JSON.stringify(Prisma).substr(0, 0)); // This ugly line is neccessary for forcing the build to execute this locally on startup
let PrismaClient;
if (Prisma.PrismaClient) {
    PrismaClient = Prisma.PrismaClient;
}
else {
    PrismaClient = Prisma.default.PrismaClient;
}
/** @type {PrismaClient} prisma */
export const prisma = new PrismaClient();

/** Develop
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
 */

/** Production
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
export const prisma = new PrismaClient();
 */
