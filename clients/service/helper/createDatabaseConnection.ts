import { Sequelize } from "sequelize";

export async function connectMySQL() {
  try {
    const sequelize = new Sequelize(
      process.env.MYSQL_DATABASE!.toString(),
      process.env.SQL_USER!.toString(),
      process.env.SQL_PASSWORD!.toString(),
      {
        host: process.env.SQL_HOST ? process.env.SQL_HOST!.toString() : "localhost",
        port: Number(process.env.MYSQL_PORT),
        dialect: "mysql",
      }
    );

    await sequelize.authenticate();
    console.log("Sequelize connection generated successfully");
  } catch (e) {
    console.log(e);
    throw new Error("Sequelize initialization error");
  }
}
