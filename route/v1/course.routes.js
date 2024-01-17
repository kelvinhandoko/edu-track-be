const { Router } = require("express")
const CourseController = require("../../controller/CourseController")
const { lecturerAuthorization } = require("../../middleware/authorization")

const courseRouter = Router()

const courseController = new CourseController()

courseRouter.get("/", courseController.getAll)
courseRouter.get("/search", courseController.search)

courseRouter.get("/detail/:id", courseController.getDetail)

courseRouter.use(lecturerAuthorization)

courseRouter.post("/", courseController.create)
courseRouter.put("/detail/:id", courseController.update)
courseRouter.delete("/detail/:id", courseController.delete)

module.exports = courseRouter
