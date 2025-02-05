import { NextFunction, Request, Response } from "express";
// import { User } from "../helper/createDatabaseConnection";
import axios from "axios";

export interface UserAttributes {
  id: string | null;
  name: string;
  email: string;
  password: string;
  level: number | null;
}

export type RequestWithUser = Request<{}, {}, { user: UserAttributes }>;

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    var token = req.cookies.token;

    if (!token) {
      if (!req.headers.authorization) {
        return res.status(401).json("User not authed");
      }
      token = req.headers.authorization!.replace("Bearer ", "");
    } else {
      axios.defaults.headers.common["Authorization"] = token;
    }

    try {
      const authServiceResponse = await axios.get<UserAttributes>(
        `http://${process.env.NODE_ENV === "dev" ? "localhost" : process.env.CLIENT_URL}:${
          process.env.CLIENT_PORT
        }/user/`
      );
      if (authServiceResponse.status === 200) {
        req.body.user = authServiceResponse.data;
      } else {
        return res.status(400).send("User not authed");
      }
      return next();
    } catch (e) {
      return res.status(400).send("User not authed");
    }
  } catch (e) {
    return res.status(500).send("Service Error");
  }
};
