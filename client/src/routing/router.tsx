import routes from "./routes.js";
import { Route } from "../type.js";

export class Router {
  public readonly routes: typeof routes;
  private readonly subscriptions = new Set<RouteSubscription>();

  constructor() {
    this.routes = routes;
  }

  public Outlet = (): HTMLElement => {
    return (
      <div
        className="router-outlet"
        $init={(element) => {
          this.onUrlChange(async ({ route, params }) => {
            element.replaceChildren(await route.component(params));
          });
        }}
      ></div>
    );
  };

  public Link = ({ href, className, $init, children }: {
    href: string;
    className?: string;
    $init?: (a: HTMLAnchorElement) => void;
    children?: any;
  }): HTMLAnchorElement => {
    return (
      <a
        href={href}
        onclick={(e) => {
          e.preventDefault();
          window.history.pushState({}, "", href);
          this.updateUrl(href);
        }}
        $init={(a) => {
          className && (a.className = className);
          $init && $init(a);
        }}
      >{children}</a>
    );
  };

  private getRouteAndParams(url: string): Omit<RouteInfo, "url"> {
    for (const name in this.routes) {
      if (name === "404")
        continue;
      const route = this.routes[name];
      if (route.url !== undefined && url === route.url)
        return { route };
      if (route.urlRegex) {
        const matches = url.match(route.urlRegex);
        if (matches)
          return { route, params: matches.groups };
      }
    }

    return {
      route: this.routes["404"]!
    };
  }

  public updateUrl(url: string) {
    const routeInfo = { url, ...this.getRouteAndParams(url) };
    this.subscriptions.forEach((subscription) => subscription(routeInfo));
  }

  public onUrlChange(subscription: RouteSubscription) {
    this.subscriptions.add(subscription);
  }
}

export default new Router();

// ===== ===== ===== ===== =====
// TYPES
// ===== ===== ===== ===== =====

interface RouteInfo {
  url: string;
  route: Route;
  params?: Record<string, string>;
}

type RouteSubscription = (routeInfo: RouteInfo) => any;