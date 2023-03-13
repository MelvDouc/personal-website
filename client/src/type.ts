export type OptionalPromise<T> = T | Promise<T>;

export interface Route {
  url?: string;
  urlRegex?: RegExp;
  getTitle: (params?: Record<string, string>) => string;
  component: (params?: Record<string, string>) => any;
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

export interface CvTranslation {
  id: string;
  fr: string;
  en: string;
}