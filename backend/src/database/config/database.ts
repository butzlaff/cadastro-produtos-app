import { Options } from 'sequelize';

const config: Options = {
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASS || 'mysecret',
  database: process.env.POSTGRES_DB || 'lexartlabs',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  dialect: 'postgres',
  dialectModule: require("pg"), // I've added this.
  logging: false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production',
    idle_in_transaction_session_timeout: 60,
  },
}

export = config;
