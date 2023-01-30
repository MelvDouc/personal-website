import type {
  NextFunction as NextFn,
  Request as Req,
  RequestHandler, Response as Res
} from "express";
import type { Document } from "mongodb";

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
  getOne: RequestHandler;
  getAll: RequestHandler;
  create: RequestHandler;
  update: RequestHandler;
  delete: RequestHandler;
}

interface Word extends Document {
  entry: string;
  class: "n" | "v" | "adj" | "adv" | "prep" | "conj" | "idiom";
}

export {
  Collection,
  Filter,
  ObjectId,
  WithId
} from "mongodb";
export {
  Document,
  CrudOperations,
  NextFn,
  Req,
  Res,
  Word
};

