import * as Joi from "@hapi/joi"

const resultSchema = Joi.object().keys({
  id: Joi.number(),
  last_check: Joi.date(),
  http_status: Joi.number(),
  payload: Joi.string(),
  endpoint_id: Joi.number()
})

export default resultSchema
