import express, { Request, Response, RequestHandler } from "express";
import { transporter } from "..";

type MailerCongratsData = Request<{}, {}, { to: string }>;
/**
 * /congrats эндпоинт.
 * Поздравление нового пользователя на почту.
 * @param {string} to - массив адресатов.
 */
const MailCongrats: RequestHandler = async (req: MailerCongratsData, res: Response) => {
  const { to } = req.body;
  try {
    console.log("sending email to " + to);
    await transporter.sendMail({
      from: `"Dan 😀" <${process.env.SENDER_EMAIL}>`,
      to: to,
      subject: "Congrats with joining our Notes App 🎉",
      text: "This message is dedicated to congradulate you with joining our app",
      html: "This message is dedicated to congradulate you with joining <b>our app</b>",
    });
    res.status(200).send(`Message is sent to ${to} successfully!`);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Service Error");
  }
};

type MailerInformData = Request<{}, {}, { to: string[]; subject: string; text: string }>;
/**
 * /inform эндпоинт.
 * Письмо для оповещения группы людей о чём-то.
 * @param {string} to - массив адресатов.
 * @param {string} subject - Заголовок, темпа письма.
 * @param {string} text - Текст сообщения, дублируется в html.
 */
const MailInformCongrats: RequestHandler = async (req: MailerInformData, res: Response) => {
  const { to, subject, text } = req.body;
  try {
    await transporter.sendMail({
      from: `"Important information 📪" <${process.env.SENDER_EMAIL}>`,
      to: to.join(", "),
      subject: subject,
      text: text,
      html: text,
    });
    res.status(200).send(`Message is sent to ${to.join(", ")} successfully!`);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Service Error");
  }
};

export const MailingRouter = express.Router();

MailingRouter.post("/congrats", MailCongrats);
MailingRouter.post("/inform", MailInformCongrats);
