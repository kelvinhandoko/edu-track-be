const { PrismaClient } = require("@prisma/client")
const prisma = require("../lib/prisma")

class BaseController {
    constructor() {
        this.db = prisma
        Object.getOwnPropertyNames(Object.getPrototypeOf(this))
            .filter(prop => typeof this[prop] === "function")
            .forEach(method => {
                this[method] = this[method].bind(this)
            })
    }
    static jsonResponse(res, code, message) {
        return res.status(code).json({ message })
    }
    /**
     * Sends a successful HTTP response.
     * @template T
     * @param {import('express').Response} res - The response object from Express.
     * @param {Object} [dto] - The data transfer object to be sent as a JSON response.
     * @param {number} [dto.code] - The status code to be sent in the response.
     * @param {T} [dto.data] - The actual data to be sent in the response.
     * @param {string} [dto.message] - A message to be sent in the response.
     * @returns {void}
     */
    ok(res, dto) {
        if (dto) {
            res.type("application/json")
            return res.status(200).json(dto)
        }
        return res.sendStatus(200)
    }
    /**
     * Sends a successful create HTTP response.
     * @template T
     * @param {import('express').Response} res - The response object from Express.
     * @param {Object} [dto] - The data transfer object to be sent as a JSON response.
     * @param {number} [dto.code] - The status code to be sent in the response.
     * @param {T} [dto.data] - The actual data to be sent in the response.
     * @param {string} [dto.message] - A message to be sent in the response.
     * @returns {void}
     */
    created(res, dto) {
        if (dto) {
            res.type("application/json")
            return res.status(201).json(dto)
        }
        return res.sendStatus(201)
    }

    /**
     * Responds with a 400 Client Error status.
     * @param {import('express').Response} res - The response object from Express.
     * @param {string} [message] - Optional message for the client error response.
     * @returns {import('express').Response} The Express response object.
     */
    clientError(res, message) {
        return BaseController.jsonResponse(res, 400, message ?? "Unauthorized")
    }

    /**
     * Responds with a 401 Unauthorized status.
     * @param {import('express').Response} res - The response object from Express.
     * @param {string} [message] - Optional message for the unauthorized response.
     * @returns {import('express').Response} The Express response object.
     */
    unauthorized(res, message) {
        return BaseController.jsonResponse(res, 401, message ?? "Unauthorized")
    }

    /**
     * Responds with a 403 Forbidden status.
     * @param {import('express').Response} res - The response object from Express.
     * @param {string} [message] - Optional message for the forbidden response.
     * @returns {import('express').Response} The Express response object.
     */
    forbidden(res, message) {
        return BaseController.jsonResponse(res, 403, message ?? "Forbidden")
    }

    /**
     * Responds with a 404 Not Found status.
     * @param {import('express').Response} res - The response object from Express.
     * @param {string} [message] - Optional message for the not found response.
     * @returns {import('express').Response} The Express response object.
     */
    notFound(res, message) {
        return BaseController.jsonResponse(res, 404, message ?? "Not found")
    }

    /**
     * Responds with a 409 Conflict status.
     * @param {import('express').Response} res - The response object from Express.
     * @param {string} [message] - Optional message for the conflict response.
     * @returns {import('express').Response} The Express response object.
     */
    conflict(res, message) {
        return BaseController.jsonResponse(res, 409, message ?? "Conflict")
    }

    /**
     * Responds with a 429 Too Many Requests status.
     * @param {import('express').Response} res - The response object from Express.
     * @param {string} [message] - Optional message for the too many requests response.
     * @returns {import('express').Response} The Express response object.
     */
    tooMany(res, message) {
        return BaseController.jsonResponse(res, 429, message ?? "Too many requests")
    }

    /**
     * Responds with a 500 Internal Server Error status.
     * @param {import('express').Response} res - The response object from Express.
     * @param {Error} error - The error object representing the server error.
     * @returns {import('express').Response} The Express response object.
     */
    fail(res, error) {
        return res.status(500).json({
            message: error.message || "server error",
        })
    }
}

module.exports = BaseController
