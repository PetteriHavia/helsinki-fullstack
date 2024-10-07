const blogRouter = require("express").Router()
const { Blog, blogUser } = require("../models")
const { userExtractor } = require("../util/middleware")

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: blogUser,
      attributes: ["username"]
    }
  })
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

blogRouter.post("/", userExtractor, async (req, res, next) => {
  try {
    const user = await blogUser.findByPk(req.user.id)
    const newBlog = await Blog.create({ ...req.body, blogUserId: user.id })
    return res.status(201).json(newBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete("/:id", userExtractor, async (req, res, next) => {
  const id = req.params.id
  try {
    const blog = await Blog.findByPk(id)
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" })
    }
    if (blog.blogUserId !== req.user.id) {
      return res.status(403).json({ error: "User has no permission to delete this blog " })
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