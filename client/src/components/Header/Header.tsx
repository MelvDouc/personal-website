import projects from "../../routing/projects.js";
import urls from "../../routing/urls.js";
import Dropdown from "../Dropdown/Dropdown.jsx";
import Link from "../Link.js";
import classes from "./Header.module.scss";

export default function Header() {
  return (
    <header className={classes.header}>
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
        <article className="text-transform-uppercase">
          <p className="fs-6"><strong>Melvin Doucet</strong></p>
          <p>Full-Stack Web Development</p>
        </article>
      </section>
      <section className="d-flex align-items-center">
        <nav className={classes.headerNav}>
          <ul className="list-style-none d-flex justify-content-end gap-3 w-100 h-100">
            <li>
              <Link href={urls.HOME.url}>Home</Link>
            </li>
            <li>
              <Dropdown
                link={<a href={urls.PROJECTS.url}>Projects</a>}
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
