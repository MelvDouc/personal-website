import { Collection } from "mongodb";
import {
  collections
} from "../database/db.js";

function getCrudOperations<T extends Document>(collection: Collection<T>) {
  return {
    getOne: async (req, res) => {
      const word = await collection.findOne({ _id: res.locals.md__entityId });
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
      const updateResult = await collection.replaceOne({ _id: res.locals.md__entityId } as any, req.body);
      res.json(updateResult);
    },
    delete: async (req, res) => {
      const deleteResult = await collection.deleteOne({
        _id: req.query.id as any
      });
      res.json(deleteResult);
    }
  } as CrudOperations;
}

const englishWordsCrud = getCrudOperations(collections.ENGLISH_VOC.WORDS);

export default {
  englishWordsCrud
};