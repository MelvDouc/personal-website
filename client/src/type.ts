export type OptionalPromise<T> = T | Promise<T>;

export interface Route {
  url?: string;
  urlRegex?: RegExp;
  getTitle: (params?: Record<string, string>) => string;
  component: (params?: Record<string, string>) => string | Node;
}

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