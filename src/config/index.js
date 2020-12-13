/* eslint-disable import/no-dynamic-require */
const { mergeIgnoringUndefined } = require('../utils/helpers');

const env = process.env.NODE_ENV;

module.exports = mergeIgnoringUndefined(require('./defaults'), env ? require(`./${env}`) : require('./local'));
