const express = require("express");
const sleep = require("../helpers");
const router = express.Router();
const data = require("../db.json");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { login, password } = req.body;
    await sleep(1000);

    const user = data.users.find((user) => user.login === login);
    if (!user) {
      return res.status(401).json("Wrong credentials");
    }

    // @ https://github.com/auth0/node-jsonwebtoken/issues/326
    const payload = {
      id: user.id,
    };

    // тут должен быть bcrypt, но это моковые данные
    if (password === user.password) {
      jwt.sign(payload, process.env.JWT_CONFIG, { expiresIn: process.env.JWT_EXPIRES_IN }, (err, token) => {
        if (err) {
          console.log(err);
          return res.status(400).json("Error occured");
        } else {
          return res.status(200).json(token);
        }
      });
    } else {
      return res.status(400).json("Error occured");
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json("Error occured");
  }
});

module.exports = router;
