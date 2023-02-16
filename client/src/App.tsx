import "./App.scss";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main.jsx";
import router from "./routing/router.js";

export default function App() {
  window.addEventListener("popstate", () => router.setUrl(location.pathname + location.search));
  router.onUrlChange(({ title }) => document.title = `Melvin Doucet's Website | ${title ?? "?"}`);

  const app = document.createDocumentFragment();
  app.append(
    <Header />,
    <Main router={router} />
  );

  router.setUrl(location.pathname + location.search);
  return app;
}