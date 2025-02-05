import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import { connectMySQL } from "./helpers/sqlconnection";

import databaseRouter from "./routes/database/database";

connectMySQL();
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", databaseRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
