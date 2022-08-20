import { QueryInterface } from 'sequelize'
import { DataTypes } from 'sequelize'
import { MigrationParams } from 'umzug'

const TABLE_NAME = 'users'

export const up = async ({
  context: queryInterface,
}: MigrationParams<QueryInterface>) => {
  await queryInterface.createTable(
    TABLE_NAME,
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passwordSalt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
      version: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    }
  )
}
export const down = async ({
  context: queryInterface,
}: MigrationParams<QueryInterface>) => {
  await queryInterface.dropTable(TABLE_NAME)
}
