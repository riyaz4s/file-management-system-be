const Joi = require('joi');
const joiObjectId = require('joi-objectid');

Joi.objectId = joiObjectId(Joi);

const {
  FILE_TYPE,
} = require('../constants');

module.exports = {
  id: Joi.object({
    id: Joi.objectId(),
  }),
  fileId: Joi.object({
    id: Joi.objectId().required(),
  }),
  move: Joi.object({
    id: Joi.objectId().required(),
    to: Joi.objectId().required(),
  }),
  create: Joi.object({
    type: Joi.string().valid(FILE_TYPE).required(),
    parent: Joi.string(),
    name: Joi.string().required(),
    content: Joi.when('type', { is: 'file', then: Joi.required(), otherwise: Joi.optional() }),
  }),
};
