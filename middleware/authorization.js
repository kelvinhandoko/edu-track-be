const firebase = require("../config/firebase")
const db = require("../lib/prisma")

const lecturerAuthorization = async (req, res, next) => {
    try {
        const { uid } = req.user
        const isLecturer = Boolean(await db.lecturer.findUnique({ where: { userId: uid } }))
        if (!isLecturer)
            return res
                .status(403)
                .json({ message: "please login as lecturer to use this feature." })
        next()
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = { lecturerAuthorization }
