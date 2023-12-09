const { Router } = require("express")
const lecturerRouter = require("./lecturer.routes")
const profileRouter = require("./profile.routes")

const v1Router = Router()

v1Router.use("/lecturer", lecturerRouter);
v1Router.use("/profile", profileRouter)

module.exports = v1Router;