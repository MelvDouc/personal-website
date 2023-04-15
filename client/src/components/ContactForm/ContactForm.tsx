import AlertBox from "@components/AlertBox/AlertBox.js";
import FormGroup from "@components/FormGroup/FormGroup.jsx";
import router from "@routing/Router.jsx";
import { sendEmail } from "@utils/api.js";
import { EmailData } from "@types";
import cssClasses from "./ContactForm.module.scss";

export default function ContactForm() {
  return (
    <form
      className={cssClasses.contactForm}
      onsubmit={async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement)) as unknown as EmailData;
        const errors = getFormErrors(formData);

        if (errors.length)
          return AlertBox.create({
            message: (
              <ul>
                {errors.map((error) => (<li>{error}</li>))}
              </ul>
            ),
            type: "danger"
          });

        const response = await sendEmail(formData);

        if (!response?.success)
          return AlertBox.create({
            message: "Something went wrong. Please try again at a later time.",
            type: "danger"
          });

        AlertBox.create({
          message: "Thanks for your message. I'll try and get back to you soon.",
          handleClose: () => router.updateUrl(router.routes.HOME.url)
        });
      }}
    >
      <FormGroup
        type="email"
        id="contact-email"
        labelText="Email"
        name="email"
        title="An email so I can get back to you"
        required={true}
      />
      <FormGroup
        type="text"
        id="contact-subject"
        labelText="Subject"
        name="subject"
        title="A summary of why you want to get in touch"
        required={true}
      />
      <FormGroup
        type="textarea"
        id="contact-message"
        labelText="Message"
        name="message"
        title="Are you interested in my services?"
        required={true}
      />
      <div className="grid-center">
        <button className="btn btn-primary">Send</button>
      </div>
    </form>
  );
}

function getFormErrors(formData: EmailData): string[] {
  const errors: string[] = [];

  if (typeof formData.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+/.test(formData.email))
    errors.push("Invalid email address.");

  if (typeof formData.subject !== "string" || formData.subject.length < 1)
    errors.push("A subject is required.");

  if (typeof formData.message !== "string" || formData.message.length < 1)
    errors.push("A message is required.");

  return errors;
}