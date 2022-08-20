import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { userController } from './controllers'
import { generalErrorHandler } from './middlewares'
import { ResourceNotFoundError } from './errors'

export function createApp() {
  const app = new Koa()
  app.use(bodyParser())

  app.use(async (ctx, next) => {
    try {
      ctx.body = await next()
    } catch (err) {
      generalErrorHandler(err, ctx)
    }
  })

  const router = new Router()
  router.post('/users', userController.register)

  app.use(router.routes()).use(router.allowedMethods())

  // catch 404 and forward to error handler
  app.use((ctx) => {
    throw new ResourceNotFoundError(ctx.request)
  })

  return app
}
