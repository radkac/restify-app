const Joi = require('@hapi/joi')

const userSchema = Joi.object().keys({
  id: Joi.number().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  access_token: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2 })
}).with('email', 'access_token')

module.exports.userSchema = userSchema
