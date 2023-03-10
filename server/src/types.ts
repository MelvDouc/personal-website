import { Request as Req, Response as Res } from "express";
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
  OptionalUnlessRequiredId,
  Req,
  Res
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production";
      readonly MONGODB_URI: string;
      readonly NODEMAILER_USER: string;
      readonly NODEMAILER_PASSWORD: string;
      readonly CLIENT_DEV_ORIGIN: string;
      readonly CLIENT_ORIGIN0: string;
      readonly CLIENT_ORIGIN1: string;
    }
  }
}

export type EntityChanges<T> = {
  updates: Partial<T>;
  removedProperties: Omit<Array<keyof T>, "_id">;
};

export interface Word extends Document {
  entry: string;
  class: "n" | "v" | "adj" | "adv" | "prep" | "conj" | "idiom";
}

export interface EmailData {
  message: string;
  email: string;
  subject: string;
}

export type Handler = (req: Req, res: Res) => any;