const express = require("express");
const app = express()
const middleware = require("./util/middleware")

const { PORT } = require("./util/config")
const { connectToDatabase } = require("./util/db")

const blogRouter = require("./controllers/blog");

app.use(express.json());

app.use("/api/blogs", blogRouter);

app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running in PORT: ${PORT}`)
  })
}

start()