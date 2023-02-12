import Calculator from "../components/Calculator/Calculator.jsx";
import PasswordGenerator from "../components/PasswordGenerator/PasswordGenerator.jsx";

const projects = {
  "password-generator": PasswordGenerator,
  calculator: Calculator
} as const;

export default function ProjectPage({ path }: { path: string }) {
  return projects[path] ?? <EmptyElement />;
}

function EmptyElement() {
  return <div></div>;
}
