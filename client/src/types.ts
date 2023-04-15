export type OptionalPromise<T> = T | Promise<T>;

export interface Route {
  url: string;
  getTitle: (params?: Record<string, string>) => string;
  component: (params?: Record<string, string>) => string | Node;
}

export interface RouteInfo {
  url: string;
  route: Route;
  params?: Record<string, string>;
}

export type RouteSubscription = (routeInfo: RouteInfo) => any;

export interface EmailData {
  email: string;
  subject: string;
  message: string;
}

export interface Coords {
  x: number;
  y: number;
}

export type Language = "fr" | "en";
export type Translation = Record<Language, string>;