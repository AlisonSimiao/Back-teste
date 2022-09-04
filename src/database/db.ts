import { Sequelize } from "sequelize";

const db = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  {
    dialect: 'mysql',
    port: +process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
  }
);

export default db;