import express, { RequestHandler, Request, Response } from "express";

type RegisterRequest = Request<{}, {}, { name: string; email: string; password: string }>;

const registerUser: RequestHandler = async (req: RegisterRequest, res: Response) => {
  const { name, email, password } = req.body;

  res.status(200).send(`${name} ${email} ${password}`);

  try {
  } catch (error) {
    console.log(error);
    res.status(500).send("Service Error");
  }
};

type AuthorizeRequest = Request<{}, {}, { name?: string; email?: string; password: string }>;

const authorizeUser: RequestHandler = async (req: AuthorizeRequest, res: Response) => {
  const { name, email, password } = req.body;

  if (name || email) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).send("Service Error");
    }
  } else {
    res.status(400).send("Neither name nor email was provided");
  }
};

export const AuthorizationRouter = express.Router();

AuthorizationRouter.post("/register", registerUser);
AuthorizationRouter.post("/authorize", authorizeUser);
