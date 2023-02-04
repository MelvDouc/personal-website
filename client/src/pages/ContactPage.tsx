import ContactForm from "../components/ContactForm.jsx";

export default function ContactPage() {
  const fragment = document.createDocumentFragment();
  fragment.append(<h2>Contact</h2>, <ContactForm />);
  return fragment;
}
