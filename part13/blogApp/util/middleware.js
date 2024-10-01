const errorHandler = (error, req, res, next) => {
  if (error.name === 'SequelizeValidationError') {

    const errorFields = {}

    error.errors.forEach(error => {
      errorFields[error.path] = error.message
    })

    return res.status(400).json({
      error: 'Validation Error',
      messages: errorFields
    });
  }

  if (error.name === "SequelizeDatabaseError") {
    return res.status(500).json({
      error: "Database Error",
      message: error.message
    })
  }
  next(error);
};

module.exports = {
  errorHandler
};