const { Router } = require("express")
const LecturerController = require("../../controller/LecturerController")

const lecturerRouter = Router()

const lecturerController = new LecturerController()

lecturerRouter.post("/", lecturerController.create)
lecturerRouter.get("/:id", lecturerController.getDetail)
lecturerRouter.put("/:id", lecturerController.update)
lecturerRouter.delete("/:id", lecturerController.delete)

module.exports = lecturerRouter
