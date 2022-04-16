const express = require("express");

const app = express();

const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");

app.use(express.json({ extended: false }));

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
