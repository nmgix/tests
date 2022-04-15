const express = require("express");

const app = express();

const authRouter = require("./routers/authRouter");

app.use(express.json({ extended: false }));
app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
