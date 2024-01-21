const BaseController = require("./BaseController")

class CategoryController extends BaseController {
    /**
     * Create a new category.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Category>}
     */
    async create(req, res) {
        try {
            const { name } = req.body
            const createCategory = await this.db.category.create({
                data: { name },
            })
            return this.created(res, {
                code: res.statusCode,
                data: createCategory,
                message: "Category created successfully",
            })
        } catch (error) {
            return this.fail(res, error)
        }
    }

    /**
     * Get all categories.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Category[]>}
     */
    async getAll(req, res) {
        try {
            const categories = await this.db.category.findMany()
            return this.ok(res, {
                code: res.statusCode,
                data: categories,
                message: "Successfully retrieved all categories",
            })
        } catch (error) {
            return this.fail(res, error.message)
        }
    }

    /**
     * Get category details by ID.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Category>}
     */
    async getDetail(req, res) {
        try {
            const { id } = req.params
            const result = await this.db.category.findUnique({ where: { id } })
            if (!result) return this.notFound(res, "Category not found.")
            return this.ok(res, {
                code: res.statusCode,
                data: result,
                message: "Successfully retrieved category details",
            })
        } catch (error) {
            return this.fail(res, error.message)
        }
    }

    /**
     * Update category details by ID.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @returns {Promise<import("@prisma/client").Category>}
     */
    async update(req, res) {
        try {
            const { id } = req.params
            const { name } = req.body
            const updatedCategory = await this.db.category.update({
                where: { id },
                data: { name },
            })
            return this.ok(res, {
                code: res.statusCode,
                data: updatedCategory,
                message: "Category updated successfully",
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
            await this.db.category.delete({ where: { id } })
            return this.ok(res, {
                code: res.statusCode,
                message: "Category deleted successfully",
            })
        } catch (error) {
            return this.fail(res, error.message)
        }
    }
}

module.exports = CategoryController
