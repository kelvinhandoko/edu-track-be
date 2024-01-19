const firebase = require("../config/firebase")

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(401).json({ message: "Please login" })
        }

        const parts = authorization.split(" ")
        if (parts.length !== 2) {
            return res.status(403).json({ message: "Invalid Authorization header format" })
        }

        const scheme = parts[0]
        const token = parts[1]

        if (scheme === "Session") {
            // Verifying ID token
            const decodedToken = await firebase.auth().verifyIdToken(token)
            req.user = decodedToken
        } else if (scheme === "Bearer") {
            // Verifying session cookie
            const decodedClaims = await firebase.auth().verifySessionCookie(token, true)
            req.user = decodedClaims
        } else {
            return res.status(403).json({ message: "Unauthorized: Unknown scheme" })
        }

        next()
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = authentication
