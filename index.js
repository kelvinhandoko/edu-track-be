require("dotenv").config()
const express = require("express")

const app = express()
const port = process.env.PORT || 5050

app.listen(port, () => {
    console.log(`server is run on: http://localhost:${port}`)
})
