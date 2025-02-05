const express = require("express");
// const jwt = require("express-jwt");
const cookies = require("cookie-parser");

const app = express();

const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");

//middleware
app.use(express.json({ extended: false }));
app.use(cookies());

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
