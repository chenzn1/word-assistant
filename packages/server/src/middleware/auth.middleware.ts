import { InvalidAuthHeaderError } from '@/errors/auth.error'
import { Context, Next } from 'koa'
import config from '@/config'
import { VerifyOptions } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

const { secret: SECRET } = config.jwt
const jwtOptions: VerifyOptions = {
  algorithms: ['HS256'],
}
function jwtVerify(jwtToken: string): any {
  try {
    return jwt.verify(jwtToken, SECRET, jwtOptions)
  } catch (error) {
    throw new InvalidAuthHeaderError()
  }
}

export function authMiddleware() {
  return (ctx: Context, next: Next) => {
    const authHeader = ctx.request.headers['authorization']
    if (!authHeader) {
      throw new InvalidAuthHeaderError('Missing Authorization header')
    }
    const schemaAndToken = authHeader.split(' ')
    if (schemaAndToken.length !== 2) {
      throw new InvalidAuthHeaderError('Invalid auth header format')
    }
    const [tokenSchema, token] = schemaAndToken
    if (!/^Bearer$/i.test(tokenSchema)) {
      throw new InvalidAuthHeaderError('Authorization only accept Bearer schema')
    }
    if (!token) {
      throw new InvalidAuthHeaderError('Missing token')
    }
    ctx.user = jwtVerify(token)

    return next()
  }
}
