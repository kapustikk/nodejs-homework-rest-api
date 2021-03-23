const Joi = require('joi')
const { rawListeners } = require('../../../app')
const { HttpCode, Subscription } = require('../../../helpers/constants')

const schemaCreateUser = Joi.object({
  email: Joi.string()
    .email()
    // .email({
    //   minDomainSegments:2, 
    //   tlds: {allow: ['com', 'net', 'ua']},
    // })
    .required(),
  password: Joi.string()
    .required(),
})

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string().valid(
  Subscription.FREE,
  Subscription.PREMIUM,
  Subscription.PRO
  )
})

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)

  if (error) {
    const [{ message }] = error.details
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Field: ${message.replace(/"/g, '')}`
    })
  }
  next()
}

module.exports.createUser = (req, res, next) => {
  return validate(schemaCreateUser, req.body, next)
}

module.exports.updateSubscription = (req, res, next) => {
  return validate(schemaUpdateSubscription, req.body, next)
}

module.exports.uploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "forbidden",
      message: "Field of avatar with file not found"
  })
  }
  next()
}