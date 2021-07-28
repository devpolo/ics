import express from "express"

const app = express()

const port = process.env.PORT || 5000

app.get("/", (_, res) => {
  res.status(200).send({ message: "OK" })
})
app.listen(port, () => console.log(`Running on port ${port}`))
