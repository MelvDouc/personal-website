import { Observable } from "reactfree-jsx";
import { sendEmail } from "../utils/api.js";

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
      className="d-flex flex-column flex-nowrap gap-3 p-3 rounded bg-green1-gradient text-light"
      onsubmit={async e => {
        e.preventDefault();
        const response = await sendEmail(formDataObs.getValue());
        if (!response?.success) {
          alert("Something went wrong. Please try again.");
          return;
        }
        confirm("Your message was sent.");
        (e.target as HTMLFormElement).reset();
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
