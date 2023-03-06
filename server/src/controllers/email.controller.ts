import emailService from "../services/email.service.js";
import { EmailData, Req, Res } from "../types.js";

async function contactAdmin(req: Req, res: Res) {
  const emailData = req.body as EmailData;
  const htmlText = await emailService.getEmailText("contact", {
    sender: emailData.email,
    message: emailData.message.replace(/\n/g, "<br>")
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