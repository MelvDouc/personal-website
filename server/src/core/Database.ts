import { MongoClient } from "mongodb";
import { Word } from "../types.js";

if (
  process.env.NODE_ENV !== "production" &&
  process.env.MONGODB_URI === undefined
) {
  const { config } = await import("dotenv");
  config({ path: ".env.local" });
}

const client = await new MongoClient(process.env.MONGODB_URI).connect();
console.log("Connected to database.");

export const collections = {
  VOC: {
    ENGLISH: () => client.db("vocabulary").collection<Word>("english"),
    GERMAN: () => client.db("vocabulary").collection<Word>("pronunciation")
  },
  CV: {
    TRANSLATIONS: () => client.db("cv").collection("translations")
  }
} as const;