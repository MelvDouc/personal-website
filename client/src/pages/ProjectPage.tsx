import PasswordGenerator from "./projects/PasswordGenerator.jsx";

export default function ProjectPage({ path }: {
  path: string;
}) {
  const projects = {
    "/password-generator": PasswordGenerator
  } as const;
  const project = projects[path] ?? (() => <div></div>);

  return project;
}