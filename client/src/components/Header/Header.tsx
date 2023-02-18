import urls, { projects } from "../../routing/urls.js";
import Link from "../Link.js";
import "./Header.scss";

export default function Header() {
  return (
    <header className="d-flex gap-6">
      <section>
        <h1>
          <Link href={urls.HOME.url}>Melvin Doucet</Link>
        </h1>
      </section>
      <section>
        <nav>
          <ul className="list-style-none d-flex gap-4 w-100 h-100">
            <li>
              <Link href={urls.HOME.url}>Home</Link>
            </li>
            <li>
              <div className="grid-center">Projects</div>
              <ul className="d-none">
                {Object.values(projects).map(({ url, title }) => (
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
