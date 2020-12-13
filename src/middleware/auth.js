const _ = require('lodash');
const { error, log } = require('../utils/logger');

const scope = 'auth';

module.exports.isAuthUser = (req, res, next) => {
  const method = 'isAuthUser';
  const user = _.get(req, 'session.user');
  if (!_.isEmpty(user)) {
    return next();
  }
  log(scope, method, 'Unauthorized access');
  return res.sendStatus(401);
};
