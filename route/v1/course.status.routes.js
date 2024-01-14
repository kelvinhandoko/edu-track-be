const { Router } = require("express");
const CourseStatusController = require("../../controller/CourseStatusController");

const courseStatusRouter = Router();

const courseStatusController = new CourseStatusController();

courseStatusRouter.post("/", courseStatusController.create);
courseStatusRouter.get("/:id", courseStatusController.getDetail);
courseStatusRouter.put("/:id", courseStatusController.update);
courseStatusRouter.delete("/:id", courseStatusController.delete);

module.exports = courseStatusRouter;
