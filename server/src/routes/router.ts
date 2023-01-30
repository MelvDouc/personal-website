import { Router } from "express";
import clientController from "../controllers/client.controller.js";
import vocController from "../controllers/voc.controller.js";
import entityId from "../middleware/entity-id.middleware.js";

const router = Router();

router.get("/voc/english/words/get-one", entityId, vocController.englishWordsCrud.getOne);
router.get("/voc/english/words/get-all", vocController.englishWordsCrud.getAll);
router.post("/voc/english/words/create", vocController.englishWordsCrud.create);
router.put("/voc/english/words/update", entityId, vocController.englishWordsCrud.update);
router.delete("/voc/english/words/delete", entityId, vocController.englishWordsCrud.delete);

if (process.env.NODE_ENV === "production")
  router.get("/*", clientController.home);

export default router;