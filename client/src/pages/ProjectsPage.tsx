import router from "@/routing/router.js";
import { projects } from "@/routing/routes.js";

export default function ProjectsPage() {
  return (
    <div className="page">
      <h2>Projects</h2>
      <ul className="projects-list">
        {projects.map((project) => (
          <li>
            <router.Link href={project.url}>{project.getTitle()}</router.Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
