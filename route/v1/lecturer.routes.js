const { Router } = require("express")
const LecturerController = require("../../controller/LecturerController")
const { lecturerAuthorization } = require("../../middleware/authorization")

const lecturerRouter = Router()

const lecturerController = new LecturerController()

lecturerRouter.post("/", lecturerController.create)
lecturerRouter.get("/", lecturerController.getAllLecturer)
lecturerRouter.get("/detail/:id?", lecturerController.getDetail)
lecturerRouter.get("/courses/:id?", lecturerController.getAllCourses)
lecturerRouter.use(lecturerAuthorization)
lecturerRouter.put("/detail/:id", lecturerController.update)
lecturerRouter.delete("/detail/:id", lecturerController.delete)

module.exports = lecturerRouter
