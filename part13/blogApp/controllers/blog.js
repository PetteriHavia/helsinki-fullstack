const blogRouter = require("express").Router()
const { Blog } = require("../models")

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll()
  if (blogs.length === 0) {
    return res.json({ message: "No blogs in database" })
  }
  return res.json(blogs)
})

blogRouter.get("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" })
    }
    res.status(201).json(blog);
  } catch (error) {
    next(error)
  }
})

blogRouter.post("/", async (req, res, next) => {
  console.log(req.body)
  try {
    const newBlog = await Blog.create(req.body)
    return res.status(201).json(newBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id
  try {
    const blog = await Blog.findByPk(id)
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" })
    }
    await blog.destroy();
    res.status(204).end();
  } catch (error) {
    next(error)
  }
})

blogRouter.put("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" })
    }
    await blog.update({ likes: req.body.likes })
    res.json(blog);
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter;