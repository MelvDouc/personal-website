import Calculator from "../components/Calculator/Calculator.jsx";
import Minesweeper from "../components/Minesweeper/Minesweeper.jsx";
import PasswordGenerator from "../components/PasswordGenerator/PasswordGenerator.jsx";

const projects = [
  {
    url: "/projects/calculator",
    title: "Calculator",
    component: Calculator
  },
  {
    url: "/projects/minesweeper",
    title: "Minesweeper",
    component: Minesweeper
  },
  {
    url: "/projects/password-generator",
    title: "Password Generator",
    component: PasswordGenerator
  }
] as {
  url: string;
  title: string;
  component: () => any;
}[];

export default projects;