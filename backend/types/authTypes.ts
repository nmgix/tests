import { Request, Response } from "express";
import { IUser } from "../models/User";

type AuthRequest = Request<{}, {}, IUser>;

type UserRequest = Request<{}, {}, { id: string }>;

export { AuthRequest, UserRequest };
