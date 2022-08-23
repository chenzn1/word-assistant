import Joi from '@hapi/joi'
import { ValidationError } from '@/errors'
import { Context, Next } from 'koa'
interface ApiParamVerifierProps {
  body?: Record<string, any>
  query?: Record<string, any>
}
function validate(schema: Joi.ObjectSchema, data?: any) {
  const result = schema.validate(data)
  if (result.error) {
    throw new ValidationError(result.error)
  }
}

export function validatorMiddleware({ body, query }: ApiParamVerifierProps) {
  let bodySchema = null
  let querySchema = null
  if (body) {
    bodySchema = Joi.object(body)
  }
  if (query) {
    querySchema = Joi.object(query)
  }
  return (ctx: Context, next: Next) => {
    if (bodySchema) {
      validate(bodySchema, ctx.request.body)
    }

    if (querySchema) {
      validate(querySchema, ctx.request.query)
    }

    return next()
  }
}
