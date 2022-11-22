import mongoose from "mongoose";

export const connectDatabase = async () => {
  const mongoDB = process.env.MONGO_URL ?? "mongodb://localhost:27017";
  await mongoose
    .connect(mongoDB)
    .then(() => console.log("Подключение к базе данных MongoDB установлено"))
    .catch((err) => console.log("Ошибка базы данных: " + err));
};
