import Header from "@components/Header/Header.jsx";
import Router from "@routing/Router.jsx";
import { languageObs, updateTranslations } from "@utils/translations/translations.service.js";
import { Language } from "@types";

export default function App() {
  window.addEventListener("popstate", () => Router.updateUrl(location.pathname));
  Router.onUrlChange(({ route, params }) => {
    document.title = `${route.getTitle(params)} | Melvin Doucet's Website`;
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
      Router.onUrlChange(() => languageObs.notify());
      languageObs.value = document.documentElement.lang as Language;
      Router.updateUrl(location.pathname);
    }
  };
}