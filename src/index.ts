import express from "express"

import { handleErrors } from "./middlewares/errors"

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/create", require("./routes/api/create"))

app.use(handleErrors)

app.listen(port, () => console.log(`Running on port ${port}`))
