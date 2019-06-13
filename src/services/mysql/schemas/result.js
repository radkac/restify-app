const Joi = require('@hapi/joi')

const resultSchema = Joi.object().keys({
  id: Joi.number().required(),
  last_check: Joi.date().required(),
  http_status: Joi.number().required(),
  payload: Joi.string().required(),
  endpoint_id: Joi.number().required()
})

module.exports.resultSchema = resultSchema
