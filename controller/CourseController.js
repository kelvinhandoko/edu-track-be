const BaseController = require("./BaseController")

/**
 * @typedef {import("@prisma/client").CourseSection} CourseSection
 */

/**
 * @typedef {import("@prisma/client").Course & {sections:Array<Pick<CourseSection,"isFree"| "isPublished" |"title" | "videoUrl" |"description" | "position" | "id" | "courseId">>}} CoursePayload
 */

class CourseController extends BaseController {
    /**
     * Create a new course.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Course>}
     */
    async create(req, res) {
        try {
            return this.db.$transaction(async tx => {
                /**
                 * @type {CoursePayload}
                 */
                const { backgroundUrl, categoryId, name, price, sections } = req.body
                const { uid } = req.user

                const findCourse = await tx.course.findUnique({
                    where: { lecturerId_name: { lecturerId: uid, name } },
                })

                const findLecturer = await tx.lecturer.findUnique({ where: { userId: uid } })

                if (findCourse) return this.conflict(res, "course ini sudah dibuat sebelumnya")
                const findCategory = await tx.category.findUnique({ where: { id: categoryId } })
                if (!findCategory) return this.notFound(res, "category ini tidak ditemukan.")

                const createdCourse = await tx.course.create({
                    data: { name, backgroundUrl, categoryId, price, lecturerId: findLecturer.id },
                })
                await Promise.all(
                    sections.map(async section => {
                        const { id, courseId, ...sectionProps } = section
                        await tx.courseSection.create({
                            data: { ...sectionProps, courseId: createdCourse.id },
                        })
                    })
                )
                return this.created(res, {
                    code: res.statusCode,
                    data: createdCourse,
                    message: "course created successfully",
                })
            })
        } catch (error) {
            return this.fail(res, error.message)
        }
    }

    /**
     * Get all course.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Course[]>}
     */
    async getAll(req, res) {
        try {
            const res = await this.db.course.findMany({
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
     * Get course details by ID.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").course>}
     */
    async getDetail(req, res) {
        try {
            const { id } = req.params
            const result = await this.db.course.findUnique({
                where: { id },
            })
            if (!result) return this.notFound(res, "course not found.")
            return this.ok(res, {
                code: res.statusCode,
                data: result,
                message: "Successfully retrieved course details",
            })
        } catch (error) {
            return this.fail(res, error.message)
        }
    }

    /**
     * Update course details by ID.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Course>}
     */
    async update(req, res) {
        try {
            return this.db.$transaction(async tx => {
                /**
                 * @type {CoursePayload}
                 */
                const { backgroundUrl, categoryId, name, price, sections } = req.body
                const { id } = req.params
                const { uid } = req.user
                const findCourse = await tx.course.findUnique({
                    where: { lecturerId_name: { lecturerId: uid, name } },
                })
                if (!findCourse) return this.conflict(res, "course tidak ditemukan")
                const findCategory = await tx.category.findUnique({ where: { id: categoryId } })
                if (!findCategory) return this.notFound(res, "category ini tidak ditemukan.")
                const updatedData = await tx.course.update({
                    data: { name, backgroundUrl, categoryId, price },
                    where: { id },
                })
                await Promise.all(
                    sections.map(async section => {
                        const { id, courseId, ...sectionProps } = section
                        if (id) {
                            await tx.courseSection.update({
                                data: { ...sectionProps, courseId: createdCourse.id },
                                where: { id },
                            })
                        } else {
                            await tx.courseSection.create({
                                data: { ...sectionProps, courseId: createdCourse.id },
                            })
                        }
                    })
                )
                return this.created(res, {
                    code: res.statusCode,
                    data: updatedData,
                    message: "course update successfully",
                })
            })
        } catch (error) {
            return this.fail(res, error.message)
        }
    }

    /**
     * Delete category by ID.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<void>}
     */
    async delete(req, res) {
        try {
            const { id } = req.params
            await this.db.course.delete({ where: { id } })
            return this.ok(res, {
                code: res.statusCode,
                message: "course deleted successfully",
            })
        } catch (error) {
            return this.fail(res, error.message)
        }
    }
}

module.exports = CourseController
