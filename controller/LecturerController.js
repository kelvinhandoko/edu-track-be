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
            const { name, bio, userId } = req.body
            const findLecturer = await this.db.lecturer.findUnique({
                where: { name_userId: { userId, name } },
            })
            if (findLecturer) return this.conflict(res, "lecturer sudah dibuat.")
            const createLecturer = await this.db.lecturer.create({ data: { name, bio, userId } })
            return this.created(res, {
                code: res.statusCode,
                data: createLecturer,
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
            const result = await this.db.lecturer.findUnique({ where: { id } })

            if (!result) return this.notFound(res, "lecturer not found.")
            return this.ok(res, {
                code: res.statusCode,
                data: result,
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
}

module.exports = LecturerController