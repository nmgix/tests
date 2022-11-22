import { Request, Response, NextFunction } from "express";
import { httpStatusCodes } from "../helpers/statusCodes";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatusCodes.NOT_FOUND);
  const error = new Error(`Url не найден`);
  next(error);
};

export { notFound };
