import PasswordGenerator from "./projects/PasswordGenerator.jsx";

const projects = {
  "password-generator": PasswordGenerator
} as const;

export default function ProjectPage({ path }: {
  path: string;
}) {
  const project = projects[path] ?? (() => <div></div>);

  return project;
}