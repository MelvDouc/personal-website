import { collections } from "../core/Database.js";
import Model from "../core/Model.js";
import { Word } from "../types.js";

export default class VocModel extends Model<Word> {
  static readonly collections = collections.VOC;
}
