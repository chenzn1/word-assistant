import { Sequelize } from 'sequelize'
import config from '../config'
import _ from 'lodash'

const { database } = config
export const sequelize = new Sequelize(database)
