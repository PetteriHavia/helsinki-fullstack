const Blog = require("./blog")
const blogUser = require("./user")

blogUser.hasMany(Blog)
Blog.belongsTo(blogUser)

Blog.sync({ alter: true })
blogUser.sync({ alter: true })

module.exports = {
  Blog,
  blogUser
}