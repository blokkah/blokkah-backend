const httpStatus = require('http-status');

exports.handleNotFound = (res, error, message) => {
  if (error.message === 'Admin not found') {
    res.status(httpStatus.NOT_FOUND).send({ message });
  } else {
    throw error;
  }
};
