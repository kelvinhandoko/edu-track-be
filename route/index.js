const { Router } = require("express")
const v1Router = require("./v1")

const router = Router()

router.use("/v1", v1Router)

router.get("*", (req, res) => res.status(404).json({ message: "route not found" }))

module.exports = router
