declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production";
      readonly MONGODB_URI: string;
      readonly CLIENT_ORIGIN: string;
    }
  }
}

type Req = import("express").Request;
type Res = import("express").Response;
type RequestHandler = import("express").RequestHandler;
type Document = import("mongodb").Document;

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
  Req,
  Res,
  Word
};

