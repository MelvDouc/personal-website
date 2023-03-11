import routes from "./routes.js";
import { RouterUrlChangeEvent, Route } from "../type.js";

export class Router extends EventTarget {
  private static readonly urlChangeEventType = "router-url-change";

  public readonly routes: typeof routes;
  private readonly outlet: HTMLElement;

  constructor() {
    super();
    this.routes = routes;
    this.outlet = (<div className="router-outlet"></div>);
    this.addEventListener(Router.urlChangeEventType, async (e) => {
      const { detail } = e as RouterUrlChangeEvent;
      this.outlet.replaceChildren(await detail.route.component(detail.params));
    });
  }

  public Outlet = (): HTMLElement => {
    return this.outlet;
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

  private getRouteAndParams(url: string): {
    route: Route;
    params?: Record<string, string>;
  } {
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
    const { route, params } = this.getRouteAndParams(url);

    this.dispatchEvent(
      new CustomEvent(Router.urlChangeEventType, {
        detail: { url, route, params }
      })
    );
  }

  public onUrlChange(listener: (e: RouterUrlChangeEvent) => any) {
    // @ts-ignore
    this.addEventListener(Router.urlChangeEventType, listener);
  }
}

export default new Router();