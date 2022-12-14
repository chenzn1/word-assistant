import crypto from 'crypto'

export function getEncryptedPassword(password: string, salt: string) {
  const text = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512')
  return text.toString('hex')
}
