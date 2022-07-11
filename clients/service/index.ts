import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../.env` });
import { connectMySQL } from "./helper";

import { AuthorizationRouter } from "./routers";

connectMySQL();
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(AuthorizationRouter);

const port = process.env.PORT ? process.env.PORT : 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
