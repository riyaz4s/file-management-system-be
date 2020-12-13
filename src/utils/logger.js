const chalk = require('chalk');

const logger = chalk.bold.yellow;
const errorLogger = chalk.bold.red;

const log = (method, scope, msg, args = {}) => {
  try {
    const value = `method: ${method}, scope: ${scope}, msg: ${msg}, args: ${JSON.stringify(args)}`;
    logger(value);
  } catch (e) {
    const value = `method: ${method}, scope: ${scope}, msg: ${msg}, args: ${args}`;
    logger(value);
  }
};

const error = (method, scope, err, args = {}) => {
  try {
    const value = `method: ${method}, scope: ${scope}, error: ${JSON.stringify(err)}, args: ${JSON.stringify(args)}`;
    errorLogger(value);
  } catch (e) {
    const value = `method: ${method}, scope: ${scope}, error: ${err}, args: ${args}`;
    errorLogger(value);
  }
};

module.exports = {
  log,
  error,
};
