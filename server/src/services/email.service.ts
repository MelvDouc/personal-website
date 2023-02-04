import { createTransport } from "nodemailer";

if (process.env.NODE_ENV !== "production" && process.env.NODEMAILER_USER === undefined) {
  const { config } = await import("dotenv");
  config({ path: ".env.local" });
}

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

export async function sendEmail(mailSettings: {
  to: string;
  subject: string;
  plainText: string;
  htmlText: string;
}) {
  try {
    const { accepted } = await transport.sendMail({
      from: process.env.NODEMAILER_USER,
      to: mailSettings.to,
      subject: mailSettings.subject,
      text: mailSettings.plainText,
      html: mailSettings.htmlText,
    });
    return accepted;
  } catch (error) {
    console.log(error);
    return null;
  }
}