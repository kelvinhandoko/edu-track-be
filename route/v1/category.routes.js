const { Router } = require("express")
const CategoryController = require("../../controller/CategoryController")

const categoryRouter = Router()

const categoryController = new CategoryController()

categoryRouter.post("/", categoryController.create)
categoryRouter.get("/", categoryController.getAll)
categoryRouter.get("/:id", categoryController.getDetail)
categoryRouter.put("/:id", categoryController.update)
categoryRouter.delete("/:id", categoryController.delete)

module.exports = categoryRouter
