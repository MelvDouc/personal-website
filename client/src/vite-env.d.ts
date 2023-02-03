/// <reference types="vite/client" />

type OptionalPromise<T> = T | Promise<T>;
type Obs<T> = import("reactfree-jsx").Observable<T>;

interface Page {
  title: string;
  component: () => OptionalPromise<Node | string>;
}