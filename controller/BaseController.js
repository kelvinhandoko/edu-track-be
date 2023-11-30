class BaseController {
    static jsonResponse(res, code, message) {
        return res.status(code).json({ message })
    }

    ok(res, dto) {
        if (dto) {
            res.type("application/json")
            return res.status(200).json(dto)
        }
        return res.sendStatus(200)
    }

    created(res) {
        return res.sendStatus(201)
    }

    clientError(res, message) {
        return BaseController.jsonResponse(res, 400, message ?? "Unauthorized")
    }

    unauthorized(res, message) {
        return BaseController.jsonResponse(res, 401, message ?? "Unauthorized")
    }

    forbidden(res, message) {
        return BaseController.jsonResponse(res, 403, message ?? "Forbidden")
    }

    notFound(res, message) {
        return BaseController.jsonResponse(res, 404, message ?? "Not found")
    }

    conflict(res, message) {
        return BaseController.jsonResponse(res, 409, message ?? "Conflict")
    }

    tooMany(res, message) {
        return BaseController.jsonResponse(res, 429, message ?? "Too many requests")
    }

    fail(res, error) {
        return res.status(500).json({
            message: error.message || "server error",
        })
    }
}
