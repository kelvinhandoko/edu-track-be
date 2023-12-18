const { Router } = require("express")
const CategoryController = require("../../controller/CategoryController")
const authentication = require("../../middleware/authentication")

const categoryRouter = Router()
const categoryController = new CategoryController()

categoryRouter.use(authentication)

categoryRouter.post("/", categoryController.create)
categoryRouter.get("/", categoryController.getAll)
categoryRouter.get("/:id", categoryController.getDetail)
categoryRouter.put("/:id", categoryController.update)
categoryRouter.delete("/:id", categoryController.delete)

module.exports = categoryRouter
