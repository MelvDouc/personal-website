import { MongoClient } from "mongodb";
import { Word } from "../types.js";

if (process.env.NODE_ENV !== "production") {
  const { config } = await import("dotenv");
  config({ path: ".env.local" });
}

const client = await new MongoClient(process.env.MONGODB_URI).connect();

console.log("Connected to database.");

const vocDb = client.db("vocabulary");
export const collections = {
  VOC: {
    ENGLISH: vocDb.collection<Word>("english"),
    GERMAN: vocDb.collection<Word>("pronunciation")
  }
} as const;