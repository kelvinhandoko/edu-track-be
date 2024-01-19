const { Router } = require("express")
const lecturerRouter = require("./lecturer.routes")
const profileRouter = require("./profile.routes")
const authentication = require("../../middleware/authentication")
const courseRouter = require("./course.routes")
const categoryRouter = require("./category.routes")
const courseStatusRouter = require("./course.status.routes")
const commentRouter = require("./comment.routes")

const v1Router = Router()
v1Router.use(authentication)

v1Router.use("/lecturer", lecturerRouter)
v1Router.use("/profile", profileRouter)
v1Router.use("/category", categoryRouter)
v1Router.use("/course", courseRouter)
v1Router.use("/courseStatus", courseStatusRouter)
v1Router.use("/comment", commentRouter)

module.exports = v1Router
