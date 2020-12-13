const chalk = require('chalk');
const _ = require('lodash');

const logger = (value) => console.log(chalk.bold.yellow(value));
const errorLogger = (value) => console.log(chalk.bold.red(value));

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
    const value = `method: ${method}, scope: ${scope}, error: ${JSON.stringify(err)}, messge: ${_.get(err, 'message')} args: ${JSON.stringify(args)}`;
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
