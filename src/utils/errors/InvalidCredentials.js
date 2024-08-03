const ApiError = require("./ApiError")
class InvalidCredentialsError extends ApiError {
    constructor(message = 'Invalid credentials', validation) {
      super(401, message, validation);
    }
  }

module.exports = InvalidCredentialsError;