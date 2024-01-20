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
courseRouter.put("/detail/:id/image", courseController.updateImage)
courseRouter.delete("/detail/:id", courseController.delete)
courseRouter.delete("/section/:id", courseController.deleteSections)

module.exports = courseRouter
