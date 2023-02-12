import Link from "./Link.jsx";
import "./Header.scss";

export default function Header() {
  return (
    <header className="bg-primary">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <h1 className="m-0 d-flex align-items-center">
            <Link className="navbar-brand" href="/">
              Melvin Doucet
            </Link>
          </h1>
          <button
            className="navbar-toggler"
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
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  href="/projects"
                  className="nav-link dropdown-toggle"
                  role="button"
                  $init={a => {
                    a.dataset.bsToggle = "dropdown";
                    a.setAttribute("aria-expanded", "false");
                  }}
                >
                  Projects
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="/projects/calculator" className="dropdown-item">
                      Calculator
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link href="/contact" className="nav-link">
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
