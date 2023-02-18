import Link from "../components/Link.jsx";
import { projects } from "../routing/urls.js";

export default function ProjectsPage() {
  return (
    <div className="page">
      <h2>Projects</h2>
      <ul className="list-style-inside">
        {Object.values(projects).map(({ title, url }) => (
          <li>
            <Link href={url}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
