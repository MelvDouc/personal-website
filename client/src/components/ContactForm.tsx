import { Observable } from "reactfree-jsx";
import router from "../routing/router.js";
import urls from "../routing/urls.js";
import { sendEmail } from "../utils/api.js";
import displayAlterBox from "./AlertBox/AlertBox.jsx";

export default function ContactForm() {
  const formDataObs = new Observable<EmailData>({
    email: "",
    subject: "",
    message: ""
  });
  const setData = (key: string) => {
    return (e: Event) =>
      formDataObs.updateValue(value => {
        value[key] = (e.target as HTMLInputElement).value;
        return value;
      });
  };

  return (
    <form
      className="d-flex flex-column flex-nowrap gap-3 p-3 rounded bg-primary bg-gradient text-light"
      onsubmit={async e => {
        e.preventDefault();
        const response = await sendEmail(formDataObs.getValue());
        if (!response?.success) {
          alert("Something went wrong. Please try again.");
          return;
        }
        displayAlterBox({
          message:
            "Your message was sent. An admin will try and get back to you soon.",
          handleClose: () => router.setUrl(urls.HOME.url)
        });
      }}
    >
      <div className="form-group">
        <label htmlFor="contact-email">Email</label>
        <input
          type="email"
          className="form-control"
          id="contact-email"
          oninput={setData("email")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact-subject">Subject</label>
        <input
          type="text"
          className="form-control"
          id="contact-subject"
          oninput={setData("subject")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact-message">Message</label>
        <textarea
          className="form-control"
          id="contact-message"
          rows={10}
          oninput={setData("message")}
          required
        ></textarea>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-primary">Send</button>
      </div>
    </form>
  );
}
