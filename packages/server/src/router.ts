import Joi from '@hapi/joi'
import Router from 'koa-router'
import { userController } from './controllers'
import { validatorMiddleware } from './middleware'

const router = new Router()
router.post(
  '/users',
  validatorMiddleware({
    body: {
      username: Joi.string()
        .min(5)
        .max(20)
        .trim()
        .pattern(/^[a-zA-Z0-9]+$/)
        .required(),
      password: Joi.string().min(6).max(20).required(),
    },
  }),
  userController.register
)

export { router }
