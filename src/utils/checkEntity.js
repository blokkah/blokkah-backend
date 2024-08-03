const httpStatus = require('http-status');
const messages = require('../constants/messages');

const checkEntity = (entity, res, entityName = messages.ENTITY_NOT_FOUND) => {
  if (!entity) {
    res.status(httpStatus.NOT_FOUND).send({ message: entityName });
    return false;
  }
  return true;
};

module.exports = checkEntity;
