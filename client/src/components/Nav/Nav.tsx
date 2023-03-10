import router from "@routing/router.jsx";
import { projects } from "@routing/routes.js";
import Dropdown from "../Dropdown/Dropdown.jsx";
import cssClasses from "./Nav.module.scss";

export default function Nav() {
  return (
    <nav className={cssClasses.nav}>
      <ul>
        <li>
          <router.Link className={cssClasses.navLink} href={router.routes.HOME.url!}>Home</router.Link>
        </li>
        <li>
          <Dropdown
            link={<a className={cssClasses.navLink} href={router.routes.PROJECTS.url}>Projects</a>}
            links={projects.map((project) => (
              <router.Link href={project.url}>{project.getTitle()}</router.Link>
            ))}
          />
        </li>
        <li>
          <router.Link href={router.routes.CV.url}>CV</router.Link>
        </li>
        <li>
          <router.Link className={cssClasses.navLink} href={router.routes.CONTACT.url!}>Contact</router.Link>
        </li>
      </ul>
    </nav>
  );
}