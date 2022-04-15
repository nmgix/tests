const express = require("express");
const sleep = require("../helpers");
const router = express.Router();
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { login, password } = req.body;

    await sleep(1000);

    // JWT
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxMzQ1IiwibmljayI6IkRlZmF1bHRVc2VyIiwiaW1nVXJsIjoiIiwibWFpbCI6ImRlZmF1bHR1c2VyQG1haWwueGNvbSJ9.aAIU4HO4WKhDbXn00qmh7W2yrx_npK1TbA9H4Bmo_bU

    // Data
    // {
    //     "id": "51345",
    //    "nick": "DefaultUser",
    //     "imgUrl": "",
    //     "mail": "defaultuser@mail.xcom"
    //  }
    console.log(process.env.LOGIN);

    if (login === process.env.LOGIN && password === process.env.PASSWORD) {
      return res
        .status(200)
        .json(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxMzQ1IiwibmljayI6IkRlZmF1bHRVc2VyIiwiaW1nVXJsIjoiIiwibWFpbCI6ImRlZmF1bHR1c2VyQG1haWwueGNvbSJ9.aAIU4HO4WKhDbXn00qmh7W2yrx_npK1TbA9H4Bmo_bU"
        );
    } else {
      return res.status(401).json("Wrong credentials");
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json("Error occured");
  }
});

module.exports = router;
