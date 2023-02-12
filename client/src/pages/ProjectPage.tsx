import Calculator from "../components/Calculator/Calculator.jsx";
import PasswordGenerator from "../components/password-generator/PasswordGenerator.jsx";

const projects = {
  "password-generator": PasswordGenerator,
  calculator: () => (
    <div className="w-100 h-100 grid-center">
      <Calculator />
    </div>
  )
} as const;

export default function ProjectPage({ path }: { path: string }) {
  const project = projects[path] ?? (() => <div></div>);

  return project;
}
