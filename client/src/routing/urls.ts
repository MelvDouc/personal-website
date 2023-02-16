export const projects = {
  PROJECTS_CALCULATOR: {
    url: "/projects/calculator",
    title: "Calculator"
  },
  PROJECTS_MINESWEEPER: {
    url: "/projects/minesweeper",
    title: "Minesweeper"
  },
  PROJECTS_PASSWORD_GENERATOR: {
    url: "/projects/password-generator",
    title: "Password Generator"
  }
};

const urls = {
  HOME: {
    url: "/home",
    title: "Home"
  },
  HOME_ALIAS: {
    url: "/",
    title: "Home"
  },
  CONTACT: {
    url: "/contact",
    title: "Contact"
  },
  PROJECTS: {
    url: "/projects",
    title: "Projects"
  },
  ...projects,
  "404": {
    url: "/page-not-found",
    title: "Page Not Found"
  }
} as const;

export default urls;