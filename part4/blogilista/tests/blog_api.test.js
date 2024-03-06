const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./blog_api_test_helper.js")
const Blog = require("../models/blog")
const api = supertest(app);


beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs)
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

/*
test("Check id", async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined();
})

test('there are three blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test("specific blog is within the returned notes", async () => {
  const response = await api.get('/api/blogs')
  const title = response.body.map(item => item.title)
  expect(title).toContain('Go To Statement Considered Harmful');
})

test("valid blog can be added", async () => {

  const newBlog = {
    title: "My new Blog",
    author: "Me",
    url: "/my/new/blog",
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const response = await helper.blogsInDb()
  expect(response).toHaveLength(helper.initialBlogs.length + 1)

  const content = response.map(item => item.title)
  expect(content).toContain("My new Blog")
})

test("blog without content is not added", async () => {
  const newBlog = {
    author: "Test Person",
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await helper.blogsInDb()
  expect(response).toHaveLength(helper.initialBlogs.length)

})

test("specific blog can be viewed", async () => {
  const blogAtStart = await helper.blogsInDb()

  const blogToView = blogAtStart[0]

  const resultBlog = await api.get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-type', /application\/json/)

  expect(resultBlog.body).toEqual(blogToView)
})

test("blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtTheEnd = await helper.blogsInDb()

  expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length - 1)

  const content = blogsAtTheEnd.map(item => item.title)
  expect(content).not.toContain(blogToDelete.title)
})

test("check if like is 0", async () => {
  const newBlog = {
    title: "Facebook blog",
    author: "Me",
    url: "facebook/blog/yeah",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const response = await helper.blogsInDb()
  const content = response.map(item => item.like)

  if (content[2] === undefined) {
    content[2] = 0;
  }

  expect(content[2]).toBe(0)
})*/

afterAll(async () => {
  await mongoose.connection.close();
});
