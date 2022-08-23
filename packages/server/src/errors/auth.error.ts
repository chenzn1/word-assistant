import { BaseError } from './base.error'
class AuthError extends BaseError {
  constructor(errorCode: number, message: string, err = '', data = null) {
    super(401, 102, errorCode, message, err, data)
  }
}
export class InvalidAuthHeaderError extends AuthError {
  constructor(message?: string) {
    super(1, 'Invalid header!', message)
  }
}

export class VerificationError extends AuthError {
  constructor() {
    super(2, '登陆失效，请重新登陆')
  }
}

export class UsernameOrPasswordError extends AuthError {
  constructor() {
    super(4, `账号或者密码错误`)
  }
}
