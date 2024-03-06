/*const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }

  next();
};*/

/*
const userExtractor = async (request, response, next) => {
  try {
    const token = request.token
    if (!token) {
      return response.status(401).json({ error: "Invalid token" })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken || !decodedToken.id) {
      return response.status(401).json({ error: "Invalid token decodedToken" })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(401).json({ error: "User not found" })
    }

    request.user = user
    next()
  } catch (error) {
    next(error)
  }
}*/


/*
//OLD CODE HERE
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
const { userExtractor } = require("../utils/middleware");


/*const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace("Bearer ", "")
  }
  return null
}


blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 })
    response.json(blogs)
});

blogRouter.get("/:id", async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        response.status(200).json(blog)
    } catch (error) {
        next(error)
    }

})

blogRouter.post("/", async (request, response, next) => {
    try {
        const body = request.body;
        //const user = request.user;

        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken || !decodedToken.id) {
            return response.status(401).json({ error: "invalid token" })
        }

        const user = await User.findById(decodedToken.id)

        const newBlog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: decodedToken.id
        });

        const savedBlog = await newBlog.save();
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog);

    } catch (error) {
        next(error)
    }
});

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
    response.json(blogs)
})


blogRouter.delete("/:id", async (request, response, next) => {
    try {

        const user = request.user
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken || !decodedToken.id) {
            return response.status(401).json({ error: "Invalid token" })
        }

        const blogIdToDelete = request.params.id;
        const blog = await Blog.findById(blogIdToDelete)

        if (!blog) {
            return response.status(404).json({ error: "Blog not found" });
        }

        if (decodedToken.id !== blog.user.toString()) {
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

////

const logger = require('./logger')
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace("Bearer ", "")
    }
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === "JsonWebTokenError") {
        return response.status(400).json({ error: "token missing or invalid" })
    } else if (error.name === "TokenExpiredError") {
        return response.status(400).json({ error: "token expired" })
    }
    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
}*/