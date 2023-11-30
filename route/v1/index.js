const { Router } = require("express")
const lecturerRouter = require("./lecturer.routes")

const v1Router = Router()

v1Router.use("/lecturer", lecturerRouter)

module.exports = v1Router
