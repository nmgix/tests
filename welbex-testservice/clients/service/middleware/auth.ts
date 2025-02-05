import { NextFunction, Request, Response } from "express";
import { User } from "../helper/createDatabaseConnection";

import jwt from "jsonwebtoken";

export type JWTPayload = {
  id: string;
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    var token = req.cookies.token;
    if (!token) {
      if (!req.headers.authorization) {
        return res.status(401).json("User not authed");
      }
      token = req.headers.authorization!.replace("Bearer ", "");
    }

    if (!token) {
      return res.status(401).json("User not authed");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!.toString()) as JWTPayload;
      const existingUser = await User.findOne({ where: { id: decoded.id } });
      if (existingUser) {
        req.body.userId = existingUser.id!;
      } else {
        res.status(400).send("User not authed");
      }
      return next();
    } catch (e) {
      res.status(400).send("User not authed");
    }
  } catch (e) {
    res.status(500).send("Service Error");
  }
};
