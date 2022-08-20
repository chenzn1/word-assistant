import { BaseError } from './base.error'

// class 100: Generic error
export class GenericError extends BaseError {
  constructor(statusCode, errorCode, message, err = '') {
    super(statusCode, 100, errorCode, message, err)
  }
}

export class UnknownServerError extends GenericError {
  constructor(err) {
    super(500, 0, '服务器未知错误', err)
  }
}

export class ValidationError extends GenericError {
  constructor(err) {
    super(400, 1, '请求验证错误', err)
  }
}
