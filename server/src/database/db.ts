import { MongoClient } from "mongodb";

if (process.env.NODE_ENV === "development") {
  const { config } = await import("dotenv");
  config({ path: ".env.local" });
}

const client = await new MongoClient(process.env.MONGODB_URI).connect();
console.log("Connected to database.");

const expressPortfolioDb = client.db("express-portfolio");
const messageCollection = expressPortfolioDb.collection("message");

// const messages = await messageCollection.find().toArray();
// console.log(messages);