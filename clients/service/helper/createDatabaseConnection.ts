import { Sequelize } from "sequelize";
import { userFactory } from "../models/User";

export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE!.toString(),
  process.env.SQL_USER!.toString(),
  process.env.SQL_PASSWORD!.toString(),
  {
    host: process.env.SQL_HOST!.toString(),
    port: Number(process.env.MYSQL_PORT_LOCAL),
    dialect: "mysql",
  }
);

sequelize.sync();

export const User = userFactory(sequelize);
