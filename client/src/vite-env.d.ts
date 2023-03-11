/// <reference types="vite/client" />

declare function h(tagName: string, props: Record<string, any>, ...children: any[]): any;

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}