/// <reference types="vite/client" />

declare function h(tagName: string, props: Record<string, any>, ...children: any[]): any;

type OptionalPromise<T> = T | Promise<T>;
type Obs<T> = import("reactfree-jsx").Observable<T>;

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Page {
  title?: string;
  component: () => OptionalPromise<Node | string>;
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