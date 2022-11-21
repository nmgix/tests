import express from "express";
import dotenv from "dotenv";
import cookies from "cookie-parser";
import helmet from "helmet";

import { AuthRouter } from "./routes/auth";
import { TodoRouter } from "./routes/todo";
import { connectDatabase } from "./helpers/connectDatabase";

const app = express();

// app settings
app.use(cookies());
app.use(helmet());
dotenv.config();
(async () => {
  await connectDatabase();
})();

// routes
app.use("/auth", AuthRouter);
app.use("/todo", TodoRouter);

// access settings
const port = process.env.PORT ?? 8080;
app.listen(port, () => console.log(`Backend active on port ${port}`));
