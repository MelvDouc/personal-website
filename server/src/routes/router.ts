import { Router, static as expressStatic } from "express";
import { readFile } from "fs/promises";
import { join, resolve } from "path";
import vocController from "../controllers/voc.controller.js";
import entityId from "../middleware/entity-id.middleware.js";

const router = Router();
const clientDir = resolve("client", "dist");

router.get("/voc/english/words/get-one", entityId, vocController.englishWordsCrud.getOne);
router.get("/voc/english/words/get-all", vocController.englishWordsCrud.getAll);
router.post("/voc/english/words/create", vocController.englishWordsCrud.create);
router.put("/voc/english/words/update", entityId, vocController.englishWordsCrud.update);
router.delete("/voc/english/words/delete", entityId, vocController.englishWordsCrud.delete);

router.get("/", async (req, res) => {
  const htmlPath = join(clientDir, "index.html");
  const data = await readFile(htmlPath);
  req.app.use(expressStatic(clientDir));
  res.end(data);
});


export default router;