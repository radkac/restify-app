const Joi = require('@hapi/joi')

const endpointSchema = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().alphanum().min(1).max(30).required(),
  url: Joi.string().min(3).required(),
  creation: Joi.date(),
  last_check: Joi.date(),
  interval: Joi.number().min(3).required(),
  user_id: Joi.number().required()
})

module.exports.endpointSchema = endpointSchema
