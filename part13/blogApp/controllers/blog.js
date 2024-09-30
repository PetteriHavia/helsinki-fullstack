const blogRouter = require("express").Router();
const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model { }

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    default: 0,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

Blog.sync();

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll()
  if (blogs.length === 0) {
    return res.json({ message: "No blogs in database" })
  }
  return res.json(blogs)
});

blogRouter.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newBlog = await Blog.create(req.body)
    return res.status(201).json(newBlog);
  } catch (error) {
    return res.status(400).json(error)
  }
})

blogRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    await blog.destroy();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occured while deleting blog" });
  }
})

module.exports = blogRouter;