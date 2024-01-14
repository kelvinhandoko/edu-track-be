const { Router } = require("express");
const CommentController = require("../../controller/CommentController");

const commentRouter = Router();

const commentController = new CommentController();

commentRouter.post("/", commentController.create);
commentRouter.get("/", commentController.getAll);
commentRouter.get("/:id", commentController.getDetail);
commentRouter.put("/:id", commentController.update);
commentRouter.delete("/:id", commentController.delete);

module.exports = commentRouter;