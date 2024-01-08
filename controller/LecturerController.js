const BaseController = require("./BaseController")

class LecturerController extends BaseController {
    /**
     * create lecturer method.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Lecturer>}
     */
    async create(req, res) {
        try {
            const { name, bio } = req.body
            const { uid } = req.user
            const findLecturer = await this.db.lecturer.findUnique({
                where: { name_userId: { userId: uid, name } },
            })
            if (findLecturer) return this.conflict(res, "lecturer sudah dibuat.")
            const createLecturer = await this.db.lecturer.create({
                data: { name, bio, userId: uid },
            })
            return this.created(res, {
                code: res.statusCode,
                message: "success create lecturer",
            })
        } catch (error) {
            return this.fail(res, error.message)
        }
    }
    /**
     * get lecturer detail method
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Lecturer>}
     */
    async getDetail(req, res) {
        try {
            const { id } = req.params
            const result = await this.db.lecturer.findUnique({
                where: { id },
                include: { Course: { include: { CourseSection: true } } },
            })

            if (!result) return this.notFound(res, "lecturer not found.")
            const findProfile = await this.db.profile.findUnique({
                where: { userId: result.userId },
            })
            return this.ok(res, {
                code: res.statusCode,
                data: { ...result, pictureUrl: findProfile.pictureUrl },
                message: "success get lecturer detail",
            })
        } catch (error) {
            return this.fail(res, error.message)
        }
    }
    /**
     * update lecturer  method
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Lecturer>}
     */
    async update(req, res) {
        try {
            const { id } = req.params
            const { name, bio } = req.body
            const result = await this.db.lecturer.findUnique({ where: { id } })

            if (!result) return this.notFound(res, "lecturer not found.")
            const updatedLecturer = await this.db.lecturer.update({
                where: { id },
                data: { name, bio },
            })
            return this.ok(res, {
                code: res.statusCode,
                data: updatedLecturer,
                message: "success update lecturer",
            })
        } catch (error) {
            return this.fail(res, error.message)
        }
    }

    /**
     * delete lecturer method
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Lecturer>}
     */
    async delete(req, res) {
        try {
            const { id } = req.params
            const result = await this.db.lecturer.findUnique({ where: { id } })

            if (!result) return this.notFound(res, "lecturer not found.")
            const deletedLecturer = await this.db.lecturer.delete({ where: { id } })
            return this.ok(res, {
                code: res.statusCode,
                data: deletedLecturer,
                message: "success delete lecturer",
            })
        } catch (error) {
            return this.fail(res, error.message)
        }
    }

    /**
     * Get all course by lecturer.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Course[]>}
     */
    async getAllCourses(req, res) {
        try {
            const { id } = req.params
            const res = await this.db.course.findMany({
                where: { lecturerId: id },
                orderBy: { createdAt: "desc" },
            })
            return this.ok(res, {
                code: res.statusCode,
                data: res,
                message: "Successfully retrieved all course",
            })
        } catch (error) {
            return this.fail(res, error.message)
        }
    }

    /**
     * Get all course by lecturer.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Lecturer[]>}
     */
    async getAllLecturer(req, res) {
        try {
            const res = await this.db.lecturer.findMany({ orderBy: { createdAt: "asc" } })
            return this.ok(res, {
                code: res.statusCode,
                data: res,
                message: "Successfully retrieved all lecturer",
            })
        } catch (error) {
            return this.fail(res, error.message)
        }
    }
}

module.exports = LecturerController
