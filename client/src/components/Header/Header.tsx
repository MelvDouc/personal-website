import urls from "../../routing/urls.js";
import Link from "../Link.js";
import Nav from "../Nav/Nav.jsx";
import cssClasses from "./Header.module.scss";

export default function Header() {
  return (
    <header className={cssClasses.header}>
      <section className={cssClasses.headerTop}>
        <article>
          <Link href={urls.HOME.url}>
            <img
              src="/img/favicon.png"
              alt="Logo"
              className={cssClasses.logo}
            />
          </Link>
        </article>
        <article className="text-transform-uppercase">
          <p className="fs-6"><strong>Melvin&nbsp;Doucet</strong></p>
          <p>Full-Stack Web Development</p>
        </article>
      </section>
      <section>
        <Nav />
      </section>
    </header>
  );
}
