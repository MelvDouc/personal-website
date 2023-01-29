import { Router } from "express";
import vocController from "../controllers/voc.controller.js";
import entityId from "../middleware/entity-id.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    hello: "world!"
  });
});

router.get("/voc/english/words/get-one", entityId, vocController.englishWordsCrud.getOne);
router.get("/voc/english/words/get-all", vocController.englishWordsCrud.getAll);
router.post("/voc/english/words/create", vocController.englishWordsCrud.create);
router.put("/voc/english/words/update", vocController.englishWordsCrud.update);
router.delete("/voc/english/words/delete", vocController.englishWordsCrud.delete);

export default router;