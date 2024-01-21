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
            /**
             * @type {CoursePayload}
             */
            const { categoryId, name, price, sections } = req.body
            const { uid } = req.user
            const findLecturer = await this.db.lecturer.findUnique({ where: { userId: uid } })
            if (!findLecturer) return this.notFound(res, "lecturer tidak ditemukan.")
            const findCourse = await this.db.course.findUnique({
                where: { lecturerId_name: { lecturerId: findLecturer.id, name } },
            })
            if (findCourse) return this.conflict(res, "course ini sudah dibuat sebelumnya")

            const findCategory = await this.db.category.findUnique({ where: { id: categoryId } })
            if (!findCategory) return this.notFound(res, "category ini tidak ditemukan.")

            const createdCourse = await this.db.course.create({
                data: { name, categoryId, price: 0, lecturerId: findLecturer.id },
            })

            await Promise.all(
                sections.map(async section => {
                    const { id, courseId, ...sectionProps } = section
                    await this.db.courseSection.create({
                        data: { ...sectionProps, courseId: createdCourse.id },
                    })
                })
            )

            return this.ok(res, {
                code: res.statusCode,
                data: createdCourse,
                message: "course created successfully",
            })
        } catch (error) {
            return this.fail(res, error)
        }
    }

    /**
     * Get all courses.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Course[]>}
     */
    async getAll(req, res) {
        try {
            const courses = await this.db.course.findMany({
                orderBy: { createdAt: "asc" },
                include: { lecturer: true, CourseSection: true },
            })

            return this.ok(res, {
                code: res.statusCode,
                data: courses,
                message: "Successfully retrieved all courses",
            })
        } catch (error) {
            return this.fail(res, error)
        }
    }

    /**
     * Get all courses by category.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Course[]>}
     */
    async getAllByCategory(req, res) {
        try {
            const { categoryId } = req.params
            const courses = await this.db.course.findMany({
                orderBy: { createdAt: "asc" },
                where: { categoryId },
                include: { lecturer: true, CourseSection: true, category: true },
            })

            return this.ok(res, {
                code: res.statusCode,
                data: courses,
                message: `Successfully retrieved all  courses`,
            })
        } catch (error) {
            return this.fail(res, error)
        }
    }

    /**
     * Get course details by ID.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Course>}
     */
    async getDetail(req, res) {
        try {
            const { id } = req.params
            const result = await this.db.course.findUnique({
                where: { id },
                include: { CourseSection: { orderBy: { position: "asc" } }, lecturer: true },
            })

            if (!result) return this.notFound(res, "course not found.")
            return this.ok(res, {
                code: res.statusCode,
                data: result,
                message: "Successfully retrieved course details",
            })
        } catch (error) {
            return this.fail(res, error)
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
            const { backgroundUrl, categoryId, name, price, sections } = req.body
            const { id } = req.params

            const findCourse = await this.db.course.findUnique({
                where: { id },
            })

            if (!findCourse) return this.notFound(res, "course tidak ditemukan")
            const findCategory = await this.db.category.findUnique({ where: { id: categoryId } })

            if (!findCategory) return this.notFound(res, "category ini tidak ditemukan.")

            const updatedData = await this.db.course.update({
                data: { name, backgroundUrl, categoryId, price },
                where: { id },
            })

            await Promise.all(
                sections.map(async section => {
                    const { id, courseId, ...sectionProps } = section
                    if (id) {
                        await this.db.courseSection.update({
                            data: { ...sectionProps, courseId: updatedData.id },
                            where: { id },
                        })
                    } else {
                        await this.db.courseSection.create({
                            data: { ...sectionProps, courseId: updatedData.id },
                        })
                    }
                })
            )

            return this.ok(res, {
                code: res.statusCode,
                data: updatedData,
                message: "course update successfully",
            })
        } catch (error) {
            return this.clientError(res, error)
        }
    }

    /**
     * Update course image by ID.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Course>}
     */
    async updateImage(req, res) {
        try {
            console.log("halooo")
            const { backgroundUrl } = req.body
            const { id } = req.params
            const { uid } = req.user

            const findCourse = await this.db.course.findUnique({
                where: { id },
            })

            if (!findCourse) return this.notFound(res, "course tidak ditemukan")

            const updatedData = await this.db.course.update({
                data: { backgroundUrl },
                where: { id },
            })

            return this.ok(res, {
                code: res.statusCode,
                data: updatedData,
                message: "course update successfully",
            })
        } catch (error) {
            return this.fail(res, error)
        }
    }

    /**
     * Delete course by ID.
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
            return this.fail(res, error)
        }
    }

    /**
     * Search courses.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Course[]>}
     */
    async search(req, res) {
        try {
            const { q } = req.query
            const splitQuery = q.split("+").join(" ")
            const findCourses = await this.db.course.findMany({
                where: {
                    OR: [
                        { name: { search: splitQuery } },
                        { lecturer: { name: { search: splitQuery } } },
                        { category: { name: { search: splitQuery } } },
                    ],
                },
                include: { lecturer: true, CourseSection: true },
            })

            return this.ok(res, {
                code: res.statusCode,
                message: "success retrieved search courses",
                data: findCourses,
            })
        } catch (error) {
            return this.fail(res, error)
        }
    }

    /**
     * Delete course sections.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<void>}
     */
    async deleteSections(req, res) {
        try {
            const { id } = req.params
            const findSection = await this.db.courseSection.findUnique({ where: { id } })
            if (!findSection) return this.notFound(res, "section tidak ditemukan")
            await this.db.courseSection.delete({ where: { id } })

            return this.ok(res, {
                code: res.statusCode,
                message: "course section deleted successfully",
            })
        } catch (error) {
            return this.notFound(res, error)
        }
    }
}

module.exports = CourseController
