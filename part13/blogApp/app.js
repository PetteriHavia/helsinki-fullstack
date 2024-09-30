const express = require("express");
const app = express();

const blogRouter = require("./controllers/blog");

app.use(express.json());
app.use("/api/blogs", blogRouter);

module.exports = app;