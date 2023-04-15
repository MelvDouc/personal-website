import globalRoutes from "./routes.js";
import { Route, RouteInfo, RouteSubscription } from "@types";

export default getRouter(globalRoutes);

function getRouter(routes: typeof globalRoutes) {
  const subscriptions = new Set<RouteSubscription>();

  const updateUrl = (url: string) => {
    const routeInfo = { url, ...getRouteAndParams(routes, url) };
    subscriptions.forEach((subscription) => subscription(routeInfo));
  };

  const onUrlChange = (subscription: RouteSubscription) => {
    subscriptions.add(subscription);
  };

  return {
    get routes() {
      return routes;
    },
    Outlet(): HTMLElement {
      return (
        <div
          className="router-outlet"
          $init={(element) => {
            onUrlChange(({ route, params }) => {
              element.replaceChildren(route.component(params));
            });
          }}
        ></div>
      );
    },
    Link({ href, className, $init, children }: {
      href: string;
      className?: string;
      $init?: (a: HTMLAnchorElement) => void;
      children?: any;
    }): HTMLAnchorElement {
      return (
        <a
          href={href}
          onclick={(e) => {
            e.preventDefault();
            window.history.pushState({}, "", href);
            updateUrl(href);
          }}
          $init={(a) => {
            className && (a.className = className);
            $init && $init(a);
          }}
        >{children}</a>
      );
    },
    updateUrl,
    onUrlChange
  };
}

function getRouteAndParams(routes: typeof globalRoutes, url: string): Omit<RouteInfo, "url"> {
  for (const name in routes) {
    if (name === "404")
      continue;

    const route: Route = routes[name];

    if (route.url !== undefined && url === route.url)
      return { route };

    if (route.urlRegex) {
      const matches = url.match(route.urlRegex);
      if (matches)
        return { route, params: matches.groups };
    }
  }

  return {
    route: routes["404"]
  };
}