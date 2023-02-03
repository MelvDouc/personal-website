import HomePage from "../pages/HomePage.jsx";

export class Router {
  private url!: string;
  private urlChangeSubscriptions = new Set<(page: Page) => any>();
  private routes = new Map<string | RegExp, Page>();

  constructor() {
    this.routes.set("404", {
      title: "Page Not Found",
      component: () => "Page Not Found"
    });
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
      if (typeof url === "string" && this.url === url || url instanceof RegExp && url.test(this.url)) {
        this.urlChangeSubscriptions.forEach((subscription) => subscription(page));
        return;
      }
    }

    const page = this.routes.get("404")!;
    this.urlChangeSubscriptions.forEach((subscription) => subscription(page));
  }
}

const router = new Router();

router.addPage("/", {
  title: "Home",
  component: HomePage
});

export default router;