const express = require("express");
const sleep = require("../helpers");
const router = express.Router();
const data = require("../db.json");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const structuredClone = require("@ungap/structured-clone");
require("dotenv").config();

router.post("/", auth, async (req, res) => {
  try {
    // var expectedUser;
    // try {
    //   const { id } = req.body;
    //   expectedUser = data.users.find((user) => user.id === id);
    // } catch (error) {
    //   console.log(error);

    //   expectedUser = data.users.find((user) => user.id === req.userId);
    // }
    // console.log(expectedUser);
    // var user = structuredClone.default(expectedUser);
    // delete user.password;
    // return res.status(200).json(user);
    try {
      //in case we are trying to get someone
      const { id } = req.body;
      const expectedUser = data.users.find((user) => user.id === id);
      var user = structuredClone.default(expectedUser);
      // delete user.id;
      delete user.password;
      return res.status(200).json(user);
    } catch (error) {
      //in case we are trying to get our dat
      const expectedUser = data.users.find((user) => user.id === req.userId);
      var user = structuredClone.default(expectedUser);
      delete user.password;
      return res.status(200).json(user);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json("Error occured");
  }
});

module.exports = router;
