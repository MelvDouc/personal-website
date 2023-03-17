import Router from "@routing/Router.jsx";
import { projects } from "@routing/routes.js";
import Dropdown from "@components/Dropdown/Dropdown.jsx";
import cssClasses from "./Nav.module.scss";

export default function Nav() {
  return (
    <nav className={cssClasses.nav}>
      <ul>
        <li>
          <Router.Link href={Router.routes.HOME.url!} className={cssClasses.navLink}>Home</Router.Link>
        </li>
        <li>
          <Dropdown>
            <Router.Link href={Router.routes.PROJECTS.url} className={cssClasses.navLink}>Projects</Router.Link>
            <div className={cssClasses.projectLinks}>
              {projects.map((project) => (
                <Router.Link href={project.url}>{project.getTitle()}</Router.Link>
              ))}
            </div>
          </Dropdown>
        </li>
        <li>
          <Router.Link href={Router.routes.CV.url} className={cssClasses.navLink}>CV</Router.Link>
        </li>
        <li>
          <Router.Link href={Router.routes.CONTACT.url!} className={cssClasses.navLink}>Contact</Router.Link>
        </li>
      </ul>
    </nav>
  );
}