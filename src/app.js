const express = require('express');
const compression = require('compression');
const cors = require('cors');

const httpStatus = require('http-status');

const config = require('./config/config');
const morgan = require('./config/morgan');

const { errorConverter, errorHandler } = require('./middlewares/error');

const ApiError = require('./utils/errors/ApiError');

const routes = require('./routes/v1');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.options('*', cors());
 
app.use('/api/v1', routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);


module.exports = app;
