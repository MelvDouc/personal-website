import { collections } from "../core/Database.js";
import { Req, Res } from "../types.js";

async function getTranslations(req: Req, res: Res) {
  const translations = await collections.CV.TRANSLATIONS().find().toArray();
  res.json(translations);
}

export default {
  getTranslations
};