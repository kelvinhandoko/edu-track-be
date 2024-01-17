const BaseController = require("./BaseController");

class CommentController extends BaseController {
    /**
     * Create a new comment.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Comment>}
     */
    async create(req, res) {
        try {
            const { commentBody, isLecturer, courseSectionId } = req.body;
            const { uid } = req.user;

            const findUser = await this.db.user.findUnique({
                where: { id: uid },
            });

            if (!findUser) return this.notFound(res, "User not found.");

            const createdComment = await this.db.comment.create({
                data: {
                    commentBody,
                    isLecturer,
                    courseSectionId,
                    userId: findUser.id,
                },
            });

            return this.created(res, {
                code: res.statusCode,
                data: createdComment,
                message: "Comment created successfully",
            });
        } catch (error) {
            return this.fail(res, error.message);
        }
    }

    /**
     * Get all comments.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Comment[]>}
     */
    async getAll(req, res) {
        try {
            const comments = await this.db.comment.findMany();
            return this.ok(res, {
                code: res.statusCode,
                data: comments,
                message: "Successfully retrieved all comments",
            });
        } catch (error) {
            return this.fail(res, error.message);
        }
    }

    /**
     * Get comment details by ID.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Comment>}
     */
    async getDetail(req, res) {
        try {
            const { id } = req.params;
            const comment = await this.db.comment.findUnique({
                where: { id },
            });

            if (!comment) return this.notFound(res, "Comment not found.");

            return this.ok(res, {
                code: res.statusCode,
                data: comment,
                message: "Successfully retrieved comment details",
            });
        } catch (error) {
            return this.fail(res, error.message);
        }
    }

    /**
     * Update comment details by ID.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Comment>}
     */
    async update(req, res) {
        try {
            const { commentBody, isLecturer } = req.body;
            const { id } = req.params;

            const updatedComment = await this.db.comment.update({
                data: { commentBody, isLecturer },
                where: { id },
            });

            return this.ok(res, {
                code: res.statusCode,
                data: updatedComment,
                message: "Comment updated successfully",
            });
        } catch (error) {
            return this.fail(res, error.message);
        }
    }

    /**
     * Delete comment by ID.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<void>}
     */
    async delete(req, res) {
        try {
            const { id } = req.params;
            await this.db.comment.delete({ where: { id } });
            return this.ok(res, {
                code: res.statusCode,
                message: "Comment deleted successfully",
            });
        } catch (error) {
            return this.fail(res, error.message);
        }
    }
}

module.exports = CommentController;
