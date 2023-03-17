import Header from "./components/Header/Header.jsx";
import Router from "./routing/router.jsx";
import { languageObs, updateTranslations } from "./utils/translations/translations.service.js";
import { Language } from "./type.js";

export default function App() {
  window.addEventListener("popstate", () => Router.updateUrl(location.pathname));
  Router.onUrlChange(({ route, params }) => {
    document.title = `${route.getTitle(params)} | Melvin Doucet's Website`;
    languageObs.notify();
  });

  return {
    mount: (parent: Node) => {
      parent.appendChild(
        <>
          <Header />
          <main>
            <Router.Outlet />
          </main>
        </>
      );
      languageObs.subscribe((language) => {
        document.documentElement.lang = language;
        updateTranslations(language);
      });
      languageObs.value = document.documentElement.lang as Language;
      Router.updateUrl(location.pathname);
    }
  };
}