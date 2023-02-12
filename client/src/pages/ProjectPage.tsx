import Calculator from "../components/Calculator/Calculator.jsx";
import Minesweeper from "../components/Minesweeper/Minesweeper.jsx";
import PasswordGenerator from "../components/PasswordGenerator/PasswordGenerator.jsx";

const projects = {
  "/calculator": Calculator,
  "/minesweeper": Minesweeper,
  "/password-generator": PasswordGenerator
} as const;

export default function ProjectPage({ path }: { path: string }) {
  return projects[path] ?? <EmptyElement />;
}

function EmptyElement() {
  return <div></div>;
}
