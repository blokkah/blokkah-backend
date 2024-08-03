const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/errors/ApiError');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map((details) => details);
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage[0].message.replaceAll(/[^a-z0-9 ]/gi, '')));
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;
