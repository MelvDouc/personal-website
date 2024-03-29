import Nav from "@components/Nav/Nav.jsx";
import Router from "@routing/Router.jsx";
import cssClasses from "./Header.module.scss";

export default function Header() {
  return (
    <header className={cssClasses.header}>
      <section className={cssClasses.headerTop}>
        <article>
          <Router.Link href={Router.routes.HOME.url!}>
            <img
              src="/img/favicon.png"
              alt="Logo"
              className={cssClasses.logo}
            />
          </Router.Link>
        </article>
        <article className={cssClasses.headerTitles}>
          <p><strong>Melvin Doucet</strong></p>
          <p>Full-Stack Web Development</p>
        </article>
      </section>
      <section>
        <Nav />
      </section>
    </header>
  );
}
