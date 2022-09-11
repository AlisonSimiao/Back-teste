import { Sequelize } from "sequelize";

const db = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  {
    dialect: process.env.NODE_ENV === 'test'? 'sqlite' : 'mysql',
    storage: "./src/__tests__/database/database.test.sqlite",
    port: +process.env.DATABASE_PORT,
    ...( process.env.NODE_ENV !== 'test' && {host: process.env.DATABASE_HOST} )
  }
);

export default db;