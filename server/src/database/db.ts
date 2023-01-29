import { MongoClient } from "mongodb";
import { Word } from "../types.js";

if (process.env.NODE_ENV === "development") {
  const { config } = await import("dotenv");
  config({ path: ".env.local" });
}

const client = await new MongoClient(process.env.MONGODB_URI).connect();
console.log("Connected to database.");

const englishVocDb = client.db("voc-english");

export const collections = {
  ENGLISH_VOC: {
    WORDS: englishVocDb.collection<Word>("words"),
    PRONUNCIATION: englishVocDb.collection("pronunciation")
  }
} as const;