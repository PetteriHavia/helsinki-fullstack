const bcrypt = require('bcrypt')
const User = require('../models/user')
const app = require("../app");
const helper = require("./users_api_test_helper")
const supertest = require("supertest");
const api = supertest(app);
//...
/*
describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'thavia',
      name: 't havia',
      password: 'salasana',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})*/

test('creating already existing username gives error', async () => {

  const newUser = {
    username: 'wrong',
    name: 'wrong',
    password: 'wrong'
  }

  const response = await api.post("/api/users").send(newUser)

  expect(response.status).toBe(400)
})

test("short username and password gives error", async () => {

  const newUser = {
    username: 'wr',
    name: 'wrong',
    password: 'wr'
  }

  const response = await api.post("/api/users").send(newUser)
  expect(response.status).toBe(400)
  expect(response.body.error).toBe("username and password needs to be atleast 3 characters long")
})

test("undefined username and password gives error", async () => {

  const newUser = {
    name: "Incomplete User"
  }

  const response = await api.post("/api/users").send(newUser)
  expect(response.status).toBe(400)
  expect(response.body.error).toBe("username or password is missing")
})