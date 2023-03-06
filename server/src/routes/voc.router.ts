import { Router } from "express";
import { englishVocController } from "../controllers/voc.controller.js";

const vocRouter = Router();

vocRouter.get("/one/:id", englishVocController.getOne);
vocRouter.get("/all", englishVocController.getAll);
vocRouter.post("/create", englishVocController.create);
vocRouter.patch("/update/:id", englishVocController.update);
vocRouter.delete("/delete/:id", englishVocController.delete);

export default vocRouter;
