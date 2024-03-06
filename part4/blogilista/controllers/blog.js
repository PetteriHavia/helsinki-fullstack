const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
const { userExtractor, tokenExtractor } = require("../utils/middleware");


/*const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace("Bearer ", "")
  }
  return null
}*/


/*blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 })
  response.json(blogs)
});*/

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    response.status(200).json(blog)
  } catch (error) {
    next(error)
  }

})

blogRouter.put("/:id", async (request, response, next) => {

  const { likes } = request.body
  const blogId = request.params.id

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, { likes: likes }, { new: true }).populate("user", { username: 1, name: 1 });

    if (!updatedBlog) {
      return response.status(404).json({ error: "Blog not found" })
    }
    response.json(updatedBlog)

  } catch (error) {
    next(error)
  }
})


blogRouter.put("/:id/comments", async (request, response, next) => {

  const { comment } = request.body

  try {
    const blogId = request.params.id
    const updatedComments = await Blog.findByIdAndUpdate(blogId, { $push: { comments: comment } }, { new: true })
    response.json(updatedComments)
  } catch (error) {
    next(error)
  }

})


blogRouter.post("/", userExtractor, async (request, response, next) => {
  try {
    const body = request.body;
    console.log(body)
    if (!request.user) {
      return response.status(401).json({ error: "User not authenticated" })
    }

    const user = await User.findById(request.user.id)

    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: request.user.id
    });

    const savedBlog = await newBlog.save();

    const populatedBlog = await savedBlog
      .populate("user", { username: 1, name: 1 })

    user.blogs = user.blogs.concat(savedBlog._id)

    await user.save()
    response.status(201).json(populatedBlog);
    console.log("Saved")
  } catch (error) {
    next(error)
  }
});

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1, blogs: 1 })
  response.json(blogs)
})

blogRouter.delete("/:id", userExtractor, async (request, response, next) => {
  try {
    const user = request.user

    const blogIdToDelete = request.params.id;
    const blog = await Blog.findById(blogIdToDelete)

    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    if (user.id !== blog.user.toString()) {
      return response.status(401).json({ error: "You are not authorized to delete this blog" })
    }

    await User.updateOne(
      { blogs: blogIdToDelete },
      { $pull: { blogs: blogIdToDelete } }
    )

    await Blog.findByIdAndDelete(blogIdToDelete)

    response.status(204).end()
  }
  catch (error) {
    next(error)
  }
})

module.exports = blogRouter;
