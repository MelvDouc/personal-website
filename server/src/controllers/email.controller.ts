import { Request, Response } from "express";
import emailService from "../services/email.service.js";
import { EmailData } from "../types.js";

async function contactAdmin(req: Request, res: Response) {
  const emailData = req.body as EmailData;
  const htmlText = await emailService.getEmailText("contact", {
    sender: emailData.email,
    message: emailData.message
      .split(/\n+/)
      .map(line => `<div>${line}</div>`)
      .join("")
  });
  const sendResult = await emailService.sendEmail({
    subject: emailData.subject,
    htmlText: htmlText,
    plainText: `Message from ${emailData.email}:\n\n${emailData.message}`
  });

  res.json({
    success: Array.isArray(sendResult) && sendResult.length > 0
  });
}

export default {
  contactAdmin
};
