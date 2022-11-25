import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { httpStatusCodes } from "../helpers/statusCodes";

type JWTPayload = {
  id: string;
};

const validationJWT = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded) {
      return false;
    } else {
      const existingUser = await User.findById((decoded as JWTPayload).id).select("-password");
      if (!existingUser) {
        return false;
      } else {
        return existingUser;
      }
    }
  } catch (error) {
    return false;
  }
};

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies[process.env.JWT_COOKIE_NAME!];
    if (!token) {
      if (!req.headers.authorization) {
        return res.status(httpStatusCodes.BAD_REQUEST).json("Пользователь не авторизован");
      }
      token = req.headers.authorization!.replace("Bearer ", "");
    } else {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    let validatedUser = await validationJWT(token);
    if (!validatedUser) {
      axios.defaults.headers.common["Authorization"] = "";
      return res.status(httpStatusCodes.BAD_REQUEST).json("Токен не действителен");
    } else {
      req.body.userId = validatedUser._id;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { auth };
