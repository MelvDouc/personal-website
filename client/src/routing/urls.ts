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
  PROJECT: {
    url: /^\/projects\/.+/,
    title: ""
  },
  "404": {
    url: "/page-not-found",
    title: "Page Not Found"
  }
} as const;

export default urls;