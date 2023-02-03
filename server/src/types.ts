import { Document } from "mongodb";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production";
      readonly MONGODB_URI: string;
      readonly CLIENT_ORIGIN: string;
    }
  }
}

export interface CrudOperations {
  getOne: any;
  getAll: any;
  create: any;
  update: any;
  delete: any;
}

export interface Word extends Document {
  entry: string;
  class: "n" | "v" | "adj" | "adv" | "prep" | "conj" | "idiom";
}