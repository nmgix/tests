// const User = require("../models/User");

// const checkRole = (role, secondRole) => {
//   return async (req, res, next) => {
//     try {
//       const user = await User.findById(req.userId);

//       if (secondRole) {
//         if (user.level == role || user.level == secondRole) {
//           next();
//         } else {
//           res.status(401).send("Non grant");
//         }
//       } else {
//         if (user.level == role) {
//           next();
//         } else {
//           res.status(401).send("Non grant");
//         }
//       }
//     } catch (e) {
//       res.status(500).send("Error occured");
//     }
//   };
// };

// module.exports = { checkRole };

import { NextFunction, Request, Response } from "express";
import { User } from "../helper/createDatabaseConnection";

export const checkRole = (minimumLevel: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).send("User not authed");
      } else {
        await User.findOne({ where: { id: userId } }).then((user) => {
          if (!user) {
            return res.status(400).send("User not authed");
          } else {
            if (user.level! >= minimumLevel) {
              return next();
            } else {
              return res.status(400).send("Access denied");
            }
          }
        });
      }
    } catch (e) {
      console.log(e);

      return res.status(500).send("Service Error");
    }
  };
};
