const httpStatus = require('http-status');
const config = require('../config/config');
const ApiError = require('../utils/errors/ApiError');
const { prismaBase } = require('../services/common/prisma.service');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode ||
      error instanceof prismaBase.PrismaClientKnownRequestError ||
      error instanceof prismaBase.PrismaClientValidationError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;

    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, error?.meta, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.log("Error Handling is Executing...")
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;
  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { validation: err.validation }),
    ...(config.env === 'development' && { stack: err.stack }),
  };

  res.status(statusCode || 200).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
