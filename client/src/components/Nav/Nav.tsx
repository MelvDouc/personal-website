import projects from "../../routing/projects.js";
import urls from "../../routing/urls.js";
import Dropdown from "../Dropdown/Dropdown.jsx";
import Link from "../Link.jsx";
import cssClasses from "./Nav.module.scss";

export default function Nav() {
  return (
    <nav className={cssClasses.nav}>
      <input type="checkbox" id="navTogglerInput" className={cssClasses.navTogglerInput} />
      <label className={cssClasses.navToggler} htmlFor="navTogglerInput"></label>
      <ul className={cssClasses.navUl}>
        <li>
          <Link className={cssClasses.navLink} href={urls.HOME.url}>Home</Link>
        </li>
        <li>
          <Dropdown
            link={<a className={cssClasses.navLink} href={urls.PROJECTS.url}>Projects</a>}
            links={projects.map(({ url, title }) => ({ href: url, text: title }))}
          />
        </li>
        <li>
          <Link className={cssClasses.navLink} href={urls.CONTACT.url}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
}