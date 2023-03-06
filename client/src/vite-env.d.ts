/// <reference types="vite/client" />

declare function h(tagName: string, props: Record<string, any>, ...children: any[]): any;

type OptionalPromise<T> = T | Promise<T>;
type RouterUrlChangeEvent = CustomEvent<{
  url: string;
  route: Route;
  params: Record<string, string> | undefined;
}>;

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Route {
  url?: string;
  urlRegex?: RegExp;
  getTitle: (params?: Record<string, string>) => string;
  component: (params?: Record<string, string>) => any;
}

interface EmailData {
  email: string;
  subject: string;
  message: string;
}

interface Coords {
  x: number;
  y: number;
}