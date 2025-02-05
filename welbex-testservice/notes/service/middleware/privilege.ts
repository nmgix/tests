import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "./auth";

export const checkRole = (minimumLevel: number) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { user } = req.body;
      if (!user) {
        return res.status(400).send("User not authed");
      } else {
        if (user.level! >= minimumLevel) {
          return next();
        } else {
          res.status(400).send("Access denied");
        }
      }
    } catch (e) {
      res.status(500).send("Service Error");
    }
  };
};
