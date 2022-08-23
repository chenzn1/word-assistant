import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { generalErrorHandler } from './middleware'
import { ResourceNotFoundError } from './errors'
import { router } from './router'

export function createApp() {
  const app = new Koa()

  app.use((ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Credentials', 'true')
    ctx.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
    )
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE, OPTIONS')
    if (ctx.request.method === 'OPTIONS') {
      ctx.status = 200
    } else {
      return next()
    }
  })

  app.use(bodyParser())

  app.use(async (ctx, next) => {
    try {
      ctx.body = await next()
    } catch (err) {
      generalErrorHandler(err, ctx)
    }
  })

  app.use(router.routes()).use(router.allowedMethods())

  // catch 404 and forward to error handler
  app.use((ctx) => {
    throw new ResourceNotFoundError(ctx.request)
  })

  return app
}
