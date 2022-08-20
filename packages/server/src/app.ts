import Koa from "koa";
import Router from "koa-router";

export function createApp() {
  const app = new Koa();
  const router = new Router();

  router.get("/", (ctx, next) => {
    // ctx.router available
    ctx.body = { words: ["a", "b"] };
  });

  app.use(router.routes()).use(router.allowedMethods());
  return app;
}
