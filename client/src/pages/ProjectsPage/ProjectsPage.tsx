import Router from "@routing/Router.jsx";
import { projects } from "@routing/routes.js";
import cssClasses from "./ProjectsPage.module.scss";

export default function ProjectsPage() {
  return (
    <div className="page">
      <h2>Projects</h2>
      <ul className={cssClasses.projectsList}>
        {projects.map((project) => (
          <li>
            <Router.Link href={project.url}>{project.getTitle()}</Router.Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
