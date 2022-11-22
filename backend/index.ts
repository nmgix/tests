import express from "express";
import dotenv from "dotenv";
import cookies from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

import { AuthRouter } from "./routes/auth";
import { TodoRouter } from "./routes/todo";
import { connectDatabase } from "./helpers/connectDatabase";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import multer from "multer";
import { fileStorage, fileFilter } from "./helpers/setupStorage";

const app = express();

// app settings

app.use(cors());
app.use(cookies());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter, limits: { fieldSize: 20000000 } }).fields([
    { name: "attachments" },
  ])
);
dotenv.config();
(async () => {
  await connectDatabase();
})();

// routes
app.use("/auth", AuthRouter);
app.use("/todo", TodoRouter);

app.use(notFound);
app.use(errorHandler);

// access settings
const port = process.env.PORT ?? 8080;
app.listen(port, () => console.log(`Бэкэнд активен на порту ${port}`));
