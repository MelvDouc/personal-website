import { Request as Req, Response as Res } from "express";
import type { Document, ObjectId } from "mongodb";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production";
      readonly MONGODB_URI: string;
      readonly CLIENT_ORIGIN: string;
    }
  }
}

interface CrudOperations {
  getOne: (req: Req, res: Res) => Promise<any>;
  getAll: (req: Req, res: Res) => Promise<any>;
  create: (req: Req, res: Res) => Promise<any>;
  update: (req: Req, res: Res) => Promise<any>;
  delete: (req: Req, res: Res) => Promise<any>;
}

interface Word extends Document {
  entry: string;
  class: "n" | "v" | "adj" | "adv" | "prep" | "conj" | "idiom";
}

export {
  Collection,
  Document,
  Filter,
  ObjectId,
  WithId
} from "mongodb";
export {
  Req,
  Res,
  CrudOperations,
  Word
};