import Calculator from "../components/Calculator/Calculator.jsx";
import PasswordGenerator from "../components/password-generator/PasswordGenerator.jsx";

const projects = {
  "password-generator": PasswordGenerator,
  calculator: Calculator
} as const;

export default function ProjectPage({ path }: { path: string }) {
  const project = projects[path] ?? (() => <div></div>);

  return project;
}
