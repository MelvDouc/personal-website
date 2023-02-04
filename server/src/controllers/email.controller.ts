import { Request, Response } from "express";
import { getTemplate, sendEmail as send } from "../services/email.service.js";

export default async function sendEmail(req: Request, res: Response) {
  const emailData = req.body as {
    message: string;
    email: string;
    subject: string;
  };
  const message = emailData.message
    .split(/\n+/)
    .map(x => `<p>${x}</p>`)
    .join("");
  const htmlText = (await getTemplate("contact"))
    .replace("{{sender}}", emailData.email)
    .replace("{{message}}", message);

  const sendResult = await send({
    subject: emailData.subject,
    plainText: htmlText,
    htmlText: htmlText
  });
  res.json({
    success: Array.isArray(sendResult) && sendResult.length > 0
  });
}
