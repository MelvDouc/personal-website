import Link from "../components/Link.jsx";
import { projects } from "../routing/urls.js";

export default function ProjectsPage() {
  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {Object.values(projects).map(({ title, url }) => (
          <li>
            <Link href={url}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
