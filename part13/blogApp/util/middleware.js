const jwt = require("jsonwebtoken")
const { User, Session } = require("../models")

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.replace("Bearer ", "")
  }
  next()
}

const userExtractor = async (req, res, next) => {
  try {
    if (req.token) {
      const decodedToken = jwt.verify(req.token, process.env.SECRET)
      if (!decodedToken || !decodedToken.id) {
        return res.status(401).json({ error: "Token missing or invalid" })
      }
      const session = await Session.findOne({ where: { userId: decodedToken.id, token: req.token } })
      if (!session) {
        return res.status(401).json({ error: "Session expired or invalid" })
      }
      const user = await User.findByPk(decodedToken.id)
      if (!user) {
        return res.status(401).json({ error: "User not found" })
      }
      if (user.disabled) {
        await session.destroy()
        return res.status(401).json({ error: "Account disabled, please contact admin" })
      }
      req.user = {
        id: user.id,
        username: user.username
      }
    }
    next()
  } catch (error) {
    console.error("Error in userExtractor:", error);
    next(error)
  }
}

const errorHandler = (error, req, res, next) => {
  const errorFields = {}

  const sequelizeError = (error) => {
    return error.errors.forEach(error => {
      errorFields[error.path] = error.message
    })
  }

  if (error.name === 'SequelizeValidationError') {
    sequelizeError(error)
    return res.status(400).json({
      error: 'Validation Error',
      message: errorFields
    });
  }
  if (error.name === "SequelizeDatabaseError") {
    sequelizeError(error)
    return res.status(500).json({
      error: "Database Error",
      message: errorFields
    })
  }
  if (error.name === "SequelizeUniqueConstraintError") {
    sequelizeError(error)
    return res.status(400).json({
      error: "Unique Constraint Error",
      message: errorFields
    })
  }
  next(error);
};

module.exports = {
  errorHandler,
  userExtractor,
  tokenExtractor
};