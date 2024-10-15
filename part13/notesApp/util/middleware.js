const jwt = require("jsonwebtoken")
const { SECRET } = require("./config")

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: "Invalid token" })
    }
  } else {
    return res.status(401).json({ error: "Token is missing" })
  }
  next()
}


module.exports = {
  tokenExtractor
}