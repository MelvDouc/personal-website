import Link from "../components/Link.jsx";
import urls from "../routing/urls.js";

export default function HomePage() {
  return (
    <div className="page d-flex flex-column justify-content-center text-light">
      <section>
        <h1 className="fs-9">A Website Bespoke And Exactly Your Size</h1>
      </section>
      <section className="fs-5">
        <p className="px-3 py-2 border-rounded bg-dark-transparent">I live in Thionville, Northeastern France, near Luxembourg. I've been a web developer for about two years. Though I've worked with many technologies like Java and PHP, I specialize in full-stack development with the ever popular JavaScript language. Need a fast, modern, versatile, scalable website? You're in the right place.</p>
      </section>
      <section>
        <Link href={urls.CONTACT.url} className="fs-5 btn btn-primary">Contact</Link>
      </section>
    </div>
  );
}