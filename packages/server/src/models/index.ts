import { sequelize } from '@/drivers'

import { User } from './User'
User.customInit(sequelize)

export { sequelize, User }
