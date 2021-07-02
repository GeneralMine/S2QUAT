/** @type {import("@prisma/client").PrismaClient} */
const prisma = require("./db");

module.exports = async function () {
    console.log("Database Stats:");
    await countEntitiy("action");
    await countEntitiy("answer");
    await countEntitiy("attribute");
    await countEntitiy("category");
    await countEntitiy("company");
    await countEntitiy("criteria");
    await countEntitiy("factor");
    await countEntitiy("field");
    await countEntitiy("page");
    await countEntitiy("project");
    await countEntitiy("question");
    await countEntitiy("response");
    await countEntitiy("scenario");
    await countEntitiy("survey");
    await countEntitiy("template");
    await countEntitiy("testperson");
    await countEntitiy("user");
}

async function countEntitiy(entity) {
    console.log("\t- " + entity + ": " + (await prisma[entity].findMany()).length);
}