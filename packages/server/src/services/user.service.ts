import { CreateUserPayload } from '@/interfaces'
import { User } from '@/models'
import { getEncryptedPassword, IdGenerator } from '@/utils'
import randomstring from 'randomstring'
import config from '@/config'
import jwt from 'jsonwebtoken'
import { UserExistsError } from '@/errors'

const { secret: SECRET } = config.jwt

function genToken(user: User): string {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '180d',
    }
  )
  return `Bearer ${token}`
}

const idGenerator = new IdGenerator()

const getUserByUsername = async (username: string) => {
  const user = await User.findOne({ where: { username } })
  return user
}
export default {
  login() {},
  async createUser(payload: CreateUserPayload) {
    const { password, username } = payload
    const passwordSalt = randomstring.generate(32)
    const oldUser = await getUserByUsername(username)
    if (oldUser) {
      throw new UserExistsError()
    }
    const newUser = await User.create({
      id: idGenerator.generate(parseInt(username, 32)),
      username,
      passwordSalt,
      lastLoginAt: new Date(),
      password: getEncryptedPassword(password, passwordSalt),
    })
    return {
      username: newUser.username,
      token: genToken(newUser),
    }
  },
}
