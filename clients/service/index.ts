import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cookies from "cookie-parser";
dotenv.config({ path: `${__dirname}/../.env` });
import { AuthorizationRouter, ManipulationRouter } from "./routers";

import { sequelize } from "./helper/createDatabaseConnection";
import axios from "axios";

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

app.use("/auth", AuthorizationRouter);
app.use("/user", ManipulationRouter);

const port = process.env.PORT ? process.env.PORT : 8080;

app.post("/ping", async (req, res) => {
  const response = await axios.post(`http://${process.env.MAIL_URL}/pong`);
  res.send(response.data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
