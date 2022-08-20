import Koa from 'koa'
import Router from 'koa-router'

export function createAp() {
  const app = new Koa()
  const router = new Router()
  router.get('/', (ctx, next) => {
    // ctx.router availab'e'''
    ctx.body = { words: ['a', 'b'] }
  })

  app.use(router.routes()).use(router.allowedMethods())
  return app
}
