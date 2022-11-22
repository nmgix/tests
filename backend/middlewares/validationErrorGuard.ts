import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { httpStatusCodes } from "../types/statusCodes";

const validationErrorGuard = (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(httpStatusCodes.BAD_REQUEST).json(validationErrors.array());
  } else {
    next();
  }
};

export { validationErrorGuard };
