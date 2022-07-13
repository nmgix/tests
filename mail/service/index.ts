import express, { Request, Response } from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config({ path: `${__dirname}/../.env` });
import * as SMTPTransport from "nodemailer/lib/smtp-transport";
import { MailingRouter } from "./router/mailing";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const nodemailerOptions: SMTPTransport.Options = {
  host: process.env.SMTP_SERVER!.toString(),
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_LOGIN!.toString(),
    pass: process.env.SMTP_PASSWORD!.toString(),
  },
};
export var transporter = nodemailer.createTransport(nodemailerOptions);

app.use(MailingRouter);

const port = process.env.PORT ? process.env.PORT : 8083;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
