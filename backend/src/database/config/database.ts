import { Options } from 'sequelize';

const config: Options = {
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASS || 'mysecret',
  database: process.env.POSTGRES_DB || 'lexartlabs',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  dialect: 'postgres',
  logging: false,
}

export = config;
