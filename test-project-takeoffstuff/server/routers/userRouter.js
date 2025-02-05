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

router.put("/edit", auth, async (req, res) => {
  try {
    const { id, editData } = req.body;
    const user = data.users.find((user) => user.id === req.userId);
    const expectedUser = user.friends.find((user) => user.id === id);
    editData.map((param) => {
      var existingParam = false;
      data.users.map((user) => {
        if (user[param.title] === param.value) {
          return (existingParam = true);
        }
      });
      if (
        existingParam ||
        expectedUser[param.title] === undefined ||
        param.title === "password" ||
        param.title === "friends"
      ) {
        return;
      }

      expectedUser[param.title] = param.value;
    });
    var resultUser = structuredClone.default(expectedUser);
    delete resultUser.password;
    return res.status(200).json({ user: resultUser });
  } catch (e) {
    console.log(e);
    return res.status(400).json("Error occured");
  }
});

router.put("/add", auth, async (req, res) => {
  try {
    const { nick } = req.body;

    const user = data.users.find((user) => user.id === req.userId);
    const newFriend = data.users.find((user) => user.nick === nick);
    var friends = (user.friends = [...user.friends, { id: newFriend.id, customNick: newFriend.nick, number: "" }]);

    return res.status(200).json(friends);
  } catch (e) {
    console.log(e);
    return res.status(400).json("Error occured");
  }
});

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;

    const user = data.users.find((user) => user.id === req.userId);

    var friends = (user.friends = user.friends.filter((friend) => friend.id != id));

    return res.status(200).json(friends);
  } catch (e) {
    console.log(e);
    return res.status(400).json("Error occured");
  }
});

router.get("/search/:nick", auth, async (req, res) => {
  try {
    const user = data.users.find((user) => user.id === req.userId);

    const nick = req.params.nick;

    const foundUsers = data.users.filter((currentUser) => {
      if (currentUser.nick.toLocaleLowerCase() === user.nick.toLocaleLowerCase()) {
        return;
      }
      if (user.friends.find((userFriend) => userFriend.id === currentUser.id)) {
        return;
      }
      return currentUser.nick.toLocaleLowerCase().includes(nick.toLocaleLowerCase());
    });
    var resultUsers = foundUsers.map((user) => {
      var copiedUser = structuredClone.default(user);
      delete copiedUser.password;
      return copiedUser;
    });

    return res.status(200).json(resultUsers);
  } catch (e) {
    console.log(e);
    return res.status(400).json("Error occured");
  }
});

module.exports = router;
