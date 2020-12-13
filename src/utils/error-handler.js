const _ = require('lodash');
const { ERRORS } = require('../constants');

const errorHandler = (error) => {
  if (_.isEmpty(error, 'statusCode') || _.isEmpty(error, 'type')) {
    return ERRORS.UnexpectedErrorOccured;
  }
  return error;
};

module.exports = errorHandler;
