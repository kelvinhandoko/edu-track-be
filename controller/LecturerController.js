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
                where: { userId: uid },
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
            return this.fail(res, error)
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
            const { uid } = req.user
            const whereClause = id ? { id } : { userId: uid }
            const result = await this.db.lecturer.findUnique({
                where: whereClause,
                include: { Course: { include: { CourseSection: true } } },
            })

            if (!result) return this.notFound(res, "lecturer not found.")
            const findProfile = await this.db.profile.findUnique({
                where: { userId: result.userId },
            })
            return this.ok(res, {
                code: res.statusCode,
                data: { ...result, profile: findProfile },
                message: "success get lecturer detail",
            })
        } catch (error) {
            return this.fail(res, error)
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
            const { uid } = req.user
            const { name, bio } = req.body
            const result = await this.db.lecturer.findUnique({ where: { userId: uid } })

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
            return this.fail(res, error)
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
            const { uid } = req.user
            const result = await this.db.lecturer.findUnique({ where: { userId: uid } })

            if (!result) return this.notFound(res, "lecturer not found.")
            const deletedLecturer = await this.db.lecturer.delete({ where: { id } })
            return this.ok(res, {
                code: res.statusCode,
                data: deletedLecturer,
                message: "success delete lecturer",
            })
        } catch (error) {
            return this.fail(res, error)
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
            const { uid } = req.user
            const whereClause = id ? { lecturerId: id } : { lecturer: { userId: uid } }
            console.log(whereClause)
            const result = await this.db.course.findMany({
                where: whereClause,
                orderBy: { createdAt: "desc" },
            })
            return this.ok(res, {
                code: res.statusCode,
                data: result,
                message: "Successfully retrieved all course",
            })
        } catch (error) {
            return this.fail(res, error)
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
            const response = await this.db.lecturer.findMany()
            return this.ok(res, {
                code: res.statusCode,
                data: response,
                message: "Successfully retrieved all lecturer",
            })
        } catch (error) {
            return this.fail(res, error)
        }
    }
}

module.exports = LecturerController
