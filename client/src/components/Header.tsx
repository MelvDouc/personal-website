import Link from "./Link.jsx";
import "./Header.scss";

export default function Header() {
  return (
    <header className="py-1 text-light bg-green1">
      <div className="container">
        <div className="row">
          <article className="col">
            <h1 className="fs-2 m-0">Melvin Doucet</h1>
          </article>
          <article className="col d-flex justify-content-center">
            <nav className="h-100">
              <ul className="list-style-none d-flex align-items-center gap-3 h-100 p-0 m-0">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/projects">Projects</Link></li>
              </ul>
            </nav>
          </article>
        </div>
      </div>
    </header>
  );
}