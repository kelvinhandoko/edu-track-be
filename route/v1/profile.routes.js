const { Router } = require("express")
const ProfileController = require("../../controller/ProfileController")

const profileRouter = Router()

const profileController = new ProfileController()

profileRouter.post("/", profileController.create)
profileRouter.get("/", profileController.getDetail)
profileRouter.put("/", profileController.update)
profileRouter.delete("/", profileController.delete)

module.exports = profileRouter
