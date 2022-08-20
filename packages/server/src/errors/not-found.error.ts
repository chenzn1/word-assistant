import { BaseError } from './base.error'

class NotFoundError extends BaseError {
  constructor(errorCode, message, err = '') {
    super(404, 103, errorCode, message, err)
  }
}

export class ResourceNotFoundError extends NotFoundError {
  constructor(req) {
    super(404, 3, `找不到资源:${req.method}:${req.path}`)
  }
}
