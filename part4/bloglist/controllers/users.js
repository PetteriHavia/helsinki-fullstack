const bcrypt = require("bcrypt")
const userRouter = require("express").Router()
const User = require("../models/user")

userRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body

    if (username === undefined || password === undefined) {
        return response.status(400).json({ error: "username or password is missing" })
    }

    if (username.length < 3 || password.length < 3) {
        return response.status(400).json({ error: "username and password needs to be atleast 3 characters long" })
    }

    const userExistAlready = await User.findOne({ username: username })

    if (userExistAlready) {
        return response.status(400).json({ error: "User with this username already exist" })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

userRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", { title: 1, author: 1, id: 1 })
    response.json(users)
})

userRouter.get("/:id", async (request, response) => {
    try {
        const user = await User.findById(request.params.id).populate("blogs", { title: 1, id: 1 })
        if (user) {
            response.json(user)
        } else {
            response.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.log("Error fetching user:", error)
        response.status(500).json({ errro: "Internal Server Error" })
    }
})

module.exports = userRouter