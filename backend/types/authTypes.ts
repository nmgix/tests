import { Request, Response } from "express";
import { IUser } from "../models/User";

type AuthRequest = Request<{}, {}, IUser>;

export { AuthRequest };
