import Calculator from "../components/Calculator/Calculator.jsx";
import Minesweeper from "../components/Minesweeper/Minesweeper.jsx";
import PasswordGenerator from "../components/PasswordGenerator/PasswordGenerator.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import ProjectsPage from "../pages/ProjectsPage.jsx";
import urls from "./urls.js";

export class Router {
  private url!: string;
  private urlChangeSubscriptions = new Set<(page: Page) => any>();
  private routes = new Map<string | RegExp, Page>();

  constructor() {
  }

  public getPage(url: string | RegExp) {
    return this.routes.get(url);
  }

  public addPage(url: string | RegExp, page: Page): this {
    this.routes.set(url, page);
    return this;
  }

  public setUrl(url: string) {
    this.url = url;
    this.notify();
  }

  public onUrlChange(subscription: (page: Page) => any) {
    this.urlChangeSubscriptions.add(subscription);
  }

  public notify(): void {
    for (const [url, page] of this.routes) {
      if ((typeof url === "string" && this.url === url) || (url instanceof RegExp && url.test(this.url))) {
        this.urlChangeSubscriptions.forEach(subscription => subscription(page));
        return;
      }
    }

    const page = this.routes.get("404")!;
    this.urlChangeSubscriptions.forEach(subscription => subscription(page));
  }
}

const router = new Router();

router.addPage(urls.HOME.url, {
  title: urls.HOME.title,
  component: HomePage
});
router.addPage(urls.HOME_ALIAS.url, router.getPage(urls.HOME.url)!);
router.addPage(urls.CONTACT.url, {
  title: urls.CONTACT.title,
  component: ContactPage
});
router.addPage(urls.PROJECTS.url, {
  title: urls.PROJECTS.title,
  component: ProjectsPage
});
router.addPage(urls.PROJECTS_CALCULATOR.url, {
  title: urls.PROJECTS_CALCULATOR.title,
  component: Calculator
});
router.addPage(urls.PROJECTS_MINESWEEPER.url, {
  title: urls.PROJECTS_MINESWEEPER.title,
  component: Minesweeper
});
router.addPage(urls.PROJECTS_PASSWORD_GENERATOR.url, {
  title: urls.PROJECTS_PASSWORD_GENERATOR.title,
  component: PasswordGenerator
});

export default router;
