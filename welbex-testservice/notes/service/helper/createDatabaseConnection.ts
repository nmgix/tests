import { Sequelize } from "sequelize";
import { noteFactory } from "../models/Note";
import { userNoteFactory } from "../models/UserNote";

export const sequelize = new Sequelize({
  database: process.env.MYSQL_DATABASE!.toString(),
  username: process.env.SQL_USER!.toString(),
  password: process.env.SQL_PASSWORD!.toString(),
  host: process.env.NODE_ENV === "dev" ? "localhost" : process.env.SQL_HOST!.toString(),
  port: process.env.NODE_ENV === "dev" ? Number(process.env.MYSQL_PORT_OUTSIDE) : Number(process.env.MYSQL_PORT_LOCAL),
  dialect: "mysql",
});

sequelize.sync();

export const Note = noteFactory(sequelize);
export const UserNote = userNoteFactory(sequelize);

UserNote.hasMany(Note, {
  foreignKey: "userId",
});
