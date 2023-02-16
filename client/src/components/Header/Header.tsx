import urls, { projects } from "../../routing/urls.js";
import Link from "../Link.js";
import "./Header.scss";

export default function Header() {
  return (
    <header className="bg-primary">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <h1 className="m-0 d-flex align-items-center">
            <Link className="navbar-brand" href={urls.HOME.url}>
              Melvin Doucet
            </Link>
          </h1>
          <button
            className="navbar-toggler border-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href={urls.HOME.url} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  href={urls.PROJECTS.url}
                  className="nav-link dropdown-toggle"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  Projects
                </a>
                <ul className="dropdown-menu">
                  {Object.values(projects).map(({ url, title }) => (
                    <li>
                      <Link href={url} className="dropdown-item">{title}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <Link href={urls.CONTACT.url} className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
