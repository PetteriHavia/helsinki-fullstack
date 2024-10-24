const express = require("express");
const app = express()
const middleware = require("./util/middleware")

const { PORT } = require("./util/config")
const { connectToDatabase } = require("./util/db")

const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const authorRouter = require("./controllers/authors.js")
const readingListsRouter = require("./controllers/readingLists.js")

app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)
app.use("/api/authors", authorRouter);
app.use("/api/readinglists", readingListsRouter)

app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running in PORT: ${PORT}`)
  })
}

start()