import { Request, Response } from "express";
import { Schema } from "mongoose";
import { IUser } from "../models/User";

type AuthRequest = Request<{}, {}, IUser>;

type UserRequest = Request<{}, {}, { userId: Schema.Types.ObjectId }>;

export { AuthRequest, UserRequest };
