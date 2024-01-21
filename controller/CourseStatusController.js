const BaseController = require("./BaseController")

class CourseStatusController extends BaseController {
    /**
     * Create a new course_status.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").course_status>}
     */
    async create(req, res) {
        try {
            const { userId, courseId, completion, type } = req.body
            const createdCourseStatus = await this.db.courseStatus.create({
                data: {
                    userId,
                    courseId,
                    completion,
                    type,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            })
            return this.created(res, {
                code: res.statusCode,
                data: createdCourseStatus,
                message: "Course status created successfully",
            })
        } catch (error) {
            return this.fail(res, error)
        }
    }

    /**
     * Get course_status by ID.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").course_status>}
     */
    async getDetail(req, res) {
        try {
            const { id } = req.params
            const result = await this.db.course_status.findUnique({
                where: { id },
            })
            if (!result) return this.notFound(res, "Course status not found.")
            return this.ok(res, {
                code: res.statusCode,
                data: result,
                message: "Successfully retrieved course status details",
            })
        } catch (error) {
            return this.fail(res, error)
        }
    }

    /**
     * Update course_status by ID.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").course_status>}
     */
    async update(req, res) {
        try {
            const { userId, courseId, completion, type } = req.body
            const { id } = req.params
            const updatedData = await this.db.course_status.update({
                data: {
                    userId,
                    courseId,
                    completion,
                    type,
                    updatedAt: new Date(),
                },
                where: { id },
            })
            return this.ok(res, {
                code: res.statusCode,
                data: updatedData,
                message: "Course status updated successfully",
            })
        } catch (error) {
            return this.fail(res, error)
        }
    }

    /**
     * Delete course_status by ID.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<void>}
     */
    async delete(req, res) {
        try {
            const { id } = req.params
            await this.db.course_status.delete({ where: { id } })
            return this.ok(res, {
                code: res.statusCode,
                message: "Course status deleted successfully",
            })
        } catch (error) {
            return this.fail(res, error)
        }
    }
}

module.exports = CourseStatusController
