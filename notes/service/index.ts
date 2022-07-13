import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cookies from "cookie-parser";
dotenv.config({ path: `${__dirname}/../.env` });

import { sequelize } from "./helper/createDatabaseConnection";
import { NotesRouter } from "./routers/notes";
import { UsersRouter } from "./routers/users";

sequelize
  .authenticate()
  .then(() => console.log("Sequelize connection generated successfully"))
  .catch((e) => {
    console.log(e);
    throw new Error("Sequelize error occured");
  });

const app = express();

app.use(helmet());
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/notes", NotesRouter);
app.use("/user", UsersRouter);

const port = process.env.PORT ? process.env.PORT : 8082;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
