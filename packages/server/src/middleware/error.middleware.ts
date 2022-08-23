import _ from 'lodash'
import { ValidationError as SequelizeValidationError } from 'sequelize'
import { logger } from '@/utils'
import { BaseError, UnknownServerError, ValidationError } from '@/errors'
import { Context } from 'koa'

export function generalErrorHandler(err: Error, ctx: Context) {
  // Wrap sequelize validation errors
  if (err instanceof SequelizeValidationError) {
    err = new ValidationError(err.message)
  }

  let e = null
  if (err && err instanceof BaseError) {
    logger.info(
      'known errors - %s|user:%j|params:%j',
      err,
      ctx.user || ctx.admin,
      ctx.request.query
    )
    e = err
  } else {
    e = new UnknownServerError(err)
    logger.error(
      'unknown errors - %s|details:%s|user:%j|params:%j',
      err,
      e.details,
      ctx.user || ctx.admin,
      ctx.request.query
    )
  }
  ctx.body = e.toJson()
  ctx.status = e.statusCode
}
