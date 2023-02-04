export default function ContactPage() {
  const fragment = document.createDocumentFragment();

  fragment.append(
    <h2>Contact</h2>,
    <form className="d-flex flex-column flex-nowrap gap-3 p-3 rounded bg-green1-gradient text-light">
      <div className="form-group">
        <label htmlFor="contact-email">Email</label>
        <input type="email" className="form-control" id="contact-email" />
      </div>
      <div className="form-group">
        <label htmlFor="contact-subject">Subject</label>
        <input type="text" className="form-control" id="contact-subject" />
      </div>
      <div className="form-group">
        <label htmlFor="contact-message">Message</label>
        <textarea className="form-control" id="contact-message" rows={10}></textarea>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-primary">Send</button>
      </div>
    </form>
  );

  return fragment;
}