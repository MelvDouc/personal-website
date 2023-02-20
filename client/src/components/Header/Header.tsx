import projects from "../../routing/projects.js";
import urls from "../../routing/urls.js";
import Dropdown from "../Dropdown/Dropdown.jsx";
import Link from "../Link.js";
import "./Header.scss";

export default function Header() {
  return (
    <header className="d-flex justify-content-between align-items-center gap-4 p-3 text-light">
      <section className="d-flex gap-3 align-items-center">
        <article className="">
          <Link className="" href={urls.HOME.url}>
            <img
              src="/img/favicon.png"
              alt="Logo"
              style={{ maxWidth: "50px" }}
            />
          </Link>
        </article>
        <article className="text-uppercase">
          <h1 className="fs-6">Melvin Doucet</h1>
          <p>Full-Stack Web Development</p>
        </article>
      </section>
      <section className="d-flex align-items-center">
        <nav className="w-100">
          <ul className="list-style-none d-flex justify-content-end gap-3 w-100 h-100">
            <li>
              <Link href={urls.HOME.url}>Home</Link>
            </li>
            <li>
              <Dropdown
                mainHref={urls.PROJECTS.url}
                mainText={urls.PROJECTS.title}
                links={projects.map(({ url, title }) => ({ href: url, text: title }))}
              />
            </li>
            <li>
              <Link href={urls.CONTACT.url}>Contact</Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
}
