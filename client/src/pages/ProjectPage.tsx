import projects from "../routing/projects.js";
import NotFoundPage from "./NotFoundPage.jsx";

export default function ProjectPage({ pathname }: {
  pathname: string;
}) {
  const project = projects.find((project) => project.url === pathname);
  if (project) {
    document.title = document.title.replace("?", project.title);
    return project.component();
  }
  return NotFoundPage();
}