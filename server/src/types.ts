import {
  Collection,
  DeleteResult,
  Document,
  Filter,
  InsertOneModel,
  OptionalUnlessRequiredId
} from "mongodb";

export type {
  Collection,
  DeleteResult,
  Document,
  Filter,
  InsertOneModel,
  OptionalUnlessRequiredId
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production";
      readonly MONGODB_URI: string;
      readonly NODEMAILER_USER: string;
      readonly NODEMAILER_PASSWORD: string;
      readonly CLIENT_DEV_ORIGIN: string;
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

export type EntityChanges<T> = {
  updates: Partial<T>;
  removedProperties: string[];
};