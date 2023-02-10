import Link from "../components/Link.jsx";

export default function ProjectsPage() {
  return (
    <div>
      <h2>Projects</h2>
      <ul>
        <li>
          <Link href="/projects/password-generator">Password Generator</Link>
        </li>
        <li>
          <Link href="/projects/calculator">Calculator</Link>
        </li>
      </ul>
    </div>
  );
}
