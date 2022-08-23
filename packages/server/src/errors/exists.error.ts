import { BaseError } from './base.error'

// class 101: Generic error
export class ExistsError extends BaseError {
  constructor(errorCode: number, message: string, err = '') {
    super(400, 101, errorCode, message, err)
  }
}

export class UserExistsError extends ExistsError {
  constructor() {
    super(1, '用户已经存在！')
  }
}
