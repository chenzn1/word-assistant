import { userService } from '@/services'
import { Context } from 'koa'

export default {
  register(ctx: Context) {
    const { username, password } = ctx.request.body
    return userService.createUser({ username, password })
  },
}
