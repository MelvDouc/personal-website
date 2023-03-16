import displayAlterBox from "@components/AlertBox/AlertBox.js";
import FormGroup from "@components/FormGroup/FormGroup.jsx";
import router from "@routing/router.jsx";
import { sendEmail } from "@utils/api.js";
import { EmailData } from "../../type.js";
import cssClasses from "./ContactForm.module.scss";

export default function ContactForm() {
  return (
    <form
      className={cssClasses.contactForm}
      onsubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const response = await sendEmail(Object.fromEntries(formData) as unknown as EmailData);
        if (!response?.success) {
          alert("Something went wrong. Please try again.");
          return;
        }
        displayAlterBox({
          message: "Thanks for your message. I'll try and get back to you soon.",
          handleClose: () => router.updateUrl(router.routes.HOME.url!)
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
