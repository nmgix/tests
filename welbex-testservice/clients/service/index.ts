import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cookies from "cookie-parser";
dotenv.config({ path: `${__dirname}/../.env` });
import { AuthorizationRouter, ManipulationRouter } from "./routers";
import bodyParser from "body-parser";

import { sequelize } from "./helper/createDatabaseConnection";

sequelize
  .authenticate()
  .then(() => console.log("Sequelize connection generated successfully"))
  .catch((e) => {
    throw new Error("Sequelize error occured");
  });

const app = express();

app.use(helmet());
app.use(cookies());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use("/auth", AuthorizationRouter);
app.use("/user", ManipulationRouter);

const port = process.env.PORT ? process.env.PORT : 8081;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
