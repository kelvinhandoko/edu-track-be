const { Router } = require("express");
const ProfileController = require("../../controller/ProfileController");

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.post("/", profileController.create);
profileRouter.get("/:id", profileController.getDetail);
profileRouter.put("/:id", profileController.update);
profileRouter.delete("/:id", profileController.delete);

module.exports = profileRouter;