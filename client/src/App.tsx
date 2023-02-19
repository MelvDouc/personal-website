import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import router from "./routing/router.js";

export default function App() {
  window.addEventListener("popstate", () => router.setUrl(location.pathname + location.search));
  router.onUrlChange(({ title }) => document.title = `${title ?? "?"} | Melvin Doucet's Website`);

  const app = (
    <>
      <Header />
      <Main router={router} />
    </>
  );

  router.setUrl(location.pathname + location.search);
  return app;
}