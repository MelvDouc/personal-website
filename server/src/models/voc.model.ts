import { collections } from "../core/Database.js";
import Model from "../core/Model.js";
import { Word } from "../types.js";

export default class VocModel extends Model<Word> {
  public static readonly collections = collections.VOC;

  public isValidEntity(entity: unknown): boolean {
    return this.isObject(entity)
      && typeof entity["entry"] === "string"
      && typeof entity["class"] === "string";
  }
}
