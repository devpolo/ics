import express from "express"

import { handleErrors } from "./middlewares/errors"

const app = express()

const port = process.env.PORT || 5000

app.use("/", require("./routes/api/index"))

app.use(handleErrors)

app.listen(port, () => console.log(`Running on port ${port}`))
