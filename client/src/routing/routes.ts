import Calculator from "@components/Calculator/Calculator.jsx";
import Minesweeper from "@components/Minesweeper/Minesweeper.jsx";
import PasswordGenerator from "@components/PasswordGenerator/PasswordGenerator.jsx";
import SnakeGame from "@components/SnakeGame/SnakeGame.jsx";
import ContactPage from "@pages/ContactPage.jsx";
import HomePage from "@pages/HomePage.jsx";
import NotFoundPage from "@pages/NotFoundPage.jsx";
import ProjectsPage from "@pages/ProjectsPage/ProjectsPage.jsx";
import ResumePage from "@pages/ResumePage/ResumePage.jsx";

const routes = {
  HOME: {
    url: "/",
    getTitle: () => "Home",
    component: HomePage
  },
  HOME_ALIAS: {
    url: "/home",
    getTitle: () => "Home",
    component: HomePage
  },
  CV: {
    url: "/cv",
    getTitle: () => "CV",
    component: ResumePage
  },
  CONTACT: {
    url: "/contact",
    getTitle: () => "Contact",
    component: ContactPage
  },
  PROJECTS: {
    url: "/projects",
    getTitle: () => "Projects",
    component: ProjectsPage
  },
  CALCULATOR: {
    url: "/projects/calculator",
    getTitle: () => "Calculator",
    component: Calculator
  },
  MINESWEEPER: {
    url: "/projects/minesweeper",
    getTitle: () => "Minesweeper",
    component: Minesweeper
  },
  PASSWORD_GENERATOR: {
    url: "/projects/password-generator",
    getTitle: () => "Password Generator",
    component: PasswordGenerator
  },
  SNAKE: {
    url: "/projects/snake",
    getTitle: () => "Snake",
    component: SnakeGame
  },
  "404": {
    url: "/page-not-found",
    getTitle: () => "Page Not Found",
    component: NotFoundPage
  }
} as const;

export const projects = [
  routes.CALCULATOR,
  routes.MINESWEEPER,
  routes.PASSWORD_GENERATOR,
  routes.SNAKE
];

export default routes;