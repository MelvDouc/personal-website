import projects from "../../routing/projects.js";
import urls from "../../routing/urls.js";
import Link from "../Link.js";
import "./Header.scss";

export default function Header() {
  return (
    <header className="d-flex flex-wrap gap-4 p-3 text-light bg-primary-gradient">
      <section>
        <h1 className="w-100 text-center">
          <Link href={urls.HOME.url}>Melvin Doucet</Link>
        </h1>
      </section>
      <section>
        <nav className="w-100">
          <ul className="list-style-none d-flex flex-wrap-portrait w-100 h-100">
            <li>
              <Link href={urls.HOME.url}>Home</Link>
            </li>
            <li>
              <Link href={urls.PROJECTS.url}>Projects</Link>
              <ul className="d-none">
                {projects.map(({ url, title }) => (
                  <li>
                    <Link href={url}>{title}</Link>
                  </li>
                ))}
              </ul>
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
