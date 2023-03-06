import { Observable } from "reactfree-jsx";
import router from "@/routing/router.jsx";
import { sendEmail } from "@/utils/api.js";
import displayAlterBox from "@/components/AlertBox/AlertBox.js";
import cssClasses from "./ContactForm.module.scss";

export default function ContactForm() {
  const formDataObs = new Observable<EmailData>({
    email: "",
    subject: "",
    message: ""
  });
  const setData = (key: string) => {
    return (e: Event) => {
      formDataObs.value[key] = (e.target as HTMLInputElement).value;
      formDataObs.notify();
    };
  };

  return (
    <form
      className={cssClasses.contactForm}
      onsubmit={async (e) => {
        e.preventDefault();
        const response = await sendEmail(formDataObs.value);
        if (!response?.success) {
          alert("Something went wrong. Please try again.");
          return;
        }
        displayAlterBox({
          message: "Your message was sent. I'll try and get back to you soon.",
          handleClose: () => router.updateUrl(router.routes.HOME.url!)
        });
      }}
    >
      <div className="form-group">
        <label htmlFor="contact-email">Email</label>
        <input
          type="email"
          id="contact-email"
          title="An email so I can get back to you"
          oninput={setData("email")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact-subject">Subject</label>
        <input
          type="text"
          id="contact-subject"
          title="A summary of why you want to get in touch"
          oninput={setData("subject")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          rows={10}
          title="Are you interested in my services?"
          oninput={setData("message")}
          required
        ></textarea>
      </div>
      <div className="grid-center">
        <button className="btn btn-primary">Send</button>
      </div>
    </form>
  );
}
