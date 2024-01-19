const { PrismaClient } = require("@prisma/client")

const db = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn", "info"] : ["error"],
})

module.exports = db
