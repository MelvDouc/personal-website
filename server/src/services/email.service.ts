import { readFile } from "fs/promises";
import { createTransport } from "nodemailer";
import { join } from "path";

if (
  process.env.NODE_ENV !== "production" &&
  process.env.NODEMAILER_USER === undefined
) {
  const { config } = await import("dotenv");
  config({ path: ".env.local" });
}

const templatesDir = join(process.cwd(), "server", "email-templates");
const transport = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

export async function sendEmail(mailSettings: {
  to?: string | string[];
  subject: string;
  plainText: string;
  htmlText: string;
}) {
  mailSettings.to ??= process.env.NODEMAILER_USER;

  try {
    const { accepted } = await transport.sendMail({
      from: process.env.NODEMAILER_USER,
      to: mailSettings.to,
      subject: mailSettings.subject,
      text: mailSettings.plainText,
      html: mailSettings.htmlText
    });
    return accepted;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * @param template Just the base name without the ".html" extension.
 */
export function getTemplate(template: string) {
  return readFile(join(templatesDir, `${template}.html`), "utf-8");
}
