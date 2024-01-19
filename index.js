require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const router = require("./route")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5050

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))
app.use("/api", router)

app.listen(port, () => {
    console.log(`⚡️ server is run on: http://localhost:${port}`)
})

module.exports = app
