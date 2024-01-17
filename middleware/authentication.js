const firebase = require("../config/firebase")

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) return res.status(401).json({ message: "please login" })
        const access_token = authorization.split(" ")
        if (access_token[0] !== "Bearer") return res.status(403).json("unAuthorized")
        const decodedToken = await firebase.auth().verifyIdToken(access_token[1])
        req.user = decodedToken
        next()
    } catch (error) {
        res.status(500).send("errornya disini")
    }
}

module.exports = authentication
