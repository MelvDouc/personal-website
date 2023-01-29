import { ObjectId } from "mongodb";
import { collections } from "../database/db.js";
import type { Collection, Document, CrudOperations, Filter } from "../types.js";

function getCrudOperations<T extends Document>(collection: Collection<T>) {
  return {
    getOne: async (req, res) => {
      const filter = ["entry"].reduce((acc, key) => {
        if (typeof req.query[key] === "string")
          acc[key] = req.query[key];
        return acc;
      }, {} as Record<string, any>);
      if ("id" in req.query) {
        filter["_id"] = new ObjectId(req.query.id as string);
      }
      console.log(filter);
      const word = await collection.findOne(filter);
      res.json(word);
    },
    getAll: async (req, res) => {
      const words = await collection.find().sort({ entry: 1 }).toArray();
      res.json(words);
    },
    create: async (req, res) => {
      const insertResult = await collection.insertOne(req.body);
      res.json(insertResult);
    },
    update: async (req, res) => {
      const { id, ...updates } = req.body;
      const updateResult = await collection.updateOne(
        { _id: new ObjectId(id) } as unknown as Filter<T>,
        { $set: updates }
      );
      res.json(updateResult);
    },
    delete: async (req, res) => {
      const { id } = req.query;
      const deleteResult = await collection.deleteOne({ _id: new ObjectId(id as string) } as unknown as Filter<T>);
      res.json(deleteResult);
    }
  } as CrudOperations;
}

const englishWordsCrud = getCrudOperations(collections.ENGLISH_VOC.WORDS);

export default {
  englishWordsCrud
};