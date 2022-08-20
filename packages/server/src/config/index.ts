import { envParser, logger } from '@/utils'
import { Options } from 'sequelize'
const credentials = envParser(__dirname, '../../', '.env.default')

export default {
  database: {
    database: credentials.DB_DATABASE as string,
    username: credentials.DB_USER as string,
    password: credentials.DB_PASSWORD as string,
    logging: false,
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      underscored: false,
      // underscoredAll: true,
      timestamps: true,
      paranoid: true,
    },
    dialect: 'mysql',
    port: (credentials.DB_PORT as number) || 3306,
    host: (credentials.DB_HOST as string) || '127.0.0.1',
  } as Options,
  umzug: {
    logging: (str) => {
      logger.info(str)
    },
  },
  jwt: {
    secret: '981902890231',
  },
}
