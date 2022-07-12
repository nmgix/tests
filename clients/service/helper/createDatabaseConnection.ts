import { Sequelize } from "sequelize";
import { userFactory } from "../models/User";
import bcrypt from "bcrypt";

export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE!.toString(),
  process.env.SQL_USER!.toString(),
  process.env.SQL_PASSWORD!.toString(),
  {
    host: process.env.SQL_HOST ? process.env.SQL_HOST!.toString() : "localhost",
    port: Number(process.env.MYSQL_PORT),
    dialect: "mysql",
  }
);
sequelize.sync();

export const User = userFactory(sequelize);
