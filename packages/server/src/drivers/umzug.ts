import path from 'path'
import { sequelize } from './sequelize'
import _ from 'lodash'
import { SequelizeStorage, Umzug } from 'umzug'
import { logger } from '@/utils'

const umzug = new Umzug({
  // storageOptions: { sequelize },
  storage: new SequelizeStorage({ sequelize }),
  context: sequelize.getQueryInterface(),
  // see: https://github.com/sequelize/umzug/issues/17
  migrations: {
    glob: path.join(__dirname, '../migrations/*.ts'),
    // path: path.join(__dirname, '../migrations'),
    // pattern: /\.js$/,
  },
  logger: logger,
})

export const umzugUp = () => {
  return umzug.up()
}

export const umzugDown = () => {
  return umzug.down()
}
