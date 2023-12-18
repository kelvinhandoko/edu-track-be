const { Router } = require("express")
const CourseController = require("../../controller/CourseController")
const { lecturerAuthorization } = require("../../middleware/authorization")

const courseRouter = Router()

const courseController = new CourseController()

courseRouter.get("/", courseController.getAll)
courseRouter.get("/:id", courseController.getDetail)

courseRouter.use(lecturerAuthorization)
courseRouter.post("/", courseController.create)
courseRouter.put("/:id", courseController.update)
courseRouter.delete("/:id", courseController.delete)

module.exports = courseRouter
