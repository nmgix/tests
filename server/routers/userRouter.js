const express = require("express");
const sleep = require("../helpers");
const router = express.Router();
const data = require("../db.json");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const structuredClone = require("@ungap/structured-clone");
require("dotenv").config();

router.get("/", auth, async (req, res) => {
  try {
    const expectedUser = data.users.find((user) => user.id === req.userId);
    var user = structuredClone.default(expectedUser);
    delete user.password;
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(400).json("Error occured");
  }
});

module.exports = router;
