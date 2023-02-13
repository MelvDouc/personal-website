/// <reference types="vite/client" />

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