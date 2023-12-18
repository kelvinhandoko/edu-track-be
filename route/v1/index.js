const { Router } = require("express")
const lecturerRouter = require("./lecturer.routes")
const profileRouter = require("./profile.routes")
const categoryRouter = require("./category.routes")
const authentication = require("../../middleware/authentication")

const v1Router = Router()
v1Router.use(authentication)

v1Router.use("/lecturer", lecturerRouter)
v1Router.use("/profile", profileRouter)
v1Router.use("/category", categoryRouter)

v1Router.get("/user", (req, res) => {
    const user = req.user
    return res.status(200).json(user)
})
module.exports = v1Router
