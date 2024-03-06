const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "Haloo?",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
});

const nonExistingId = async () => {
  const blog = new Blog({ title: "Cool title" })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};


module.exports = {
  blogsInDb, initialBlogs, nonExistingId
};
