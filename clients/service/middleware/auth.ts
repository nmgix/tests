import { NextFunction, Response } from "express";
import { User } from "../helper/createDatabaseConnection";

const jwt = require("jsonwebtoken");

export interface TokenedRequest extends Request {
  cookies: { token?: string };
  userId: string;
}

module.exports = async (req: TokenedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json("User not authed");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const existingUser = await User.findOne({ where: { id: token } });
    if (existingUser) {
      req.userId = existingUser.id!;
    } else {
      throw new Error("User auth error");
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json("User not authed");
  }
};
