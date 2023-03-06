import Header from "./components/Header/Header.jsx";
import Router from "./routing/router.jsx";

export default function App() {
  window.addEventListener("popstate", () => Router.updateUrl(location.pathname));
  Router.onUrlChange(({ detail }) => {
    document.title = `${detail.route.getTitle(detail.params)} | Melvin Doucet's Website`;
  });

  const app = (
    <>
      <Header />
      <main>
        <Router.Outlet />
      </main>
    </>
  );

  Router.updateUrl(location.pathname);
  return app;
}