const _ = require('lodash');
const { ERRORS } = require('../constants');

const errorHandler = (error) => {
  if (_.isEmpty(_.toString(_.get(error, 'statusCode'))) || _.isEmpty(_.get(error, 'type'))) {
    return ERRORS.UnexpectedErrorOccured;
  }
  return error;
};

module.exports = errorHandler;
