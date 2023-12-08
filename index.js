require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const profileRouter = require("./route/v1/profile.routes");

const app = express();
const port = process.env.PORT || 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", profileRouter);

app.listen(port, () => {
  console.log(`⚡️ server is run on: http://localhost:${port}`);
});
