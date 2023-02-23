import { Router } from "express";
import { englishVocController } from "../controllers/voc.controller.js";

const vocRouter = Router();

vocRouter.get("/one/:id", async (req, res) => await englishVocController.getOne(req, res));
vocRouter.get("/all", async (req, res) => await englishVocController.getAll(req, res));
vocRouter.post("/create", async (req, res) => await englishVocController.create(req, res));
vocRouter.patch("/update/:id", async (req, res) => await englishVocController.update(req, res));
vocRouter.delete("/delete/:id", async (req, res) => await englishVocController.delete(req, res));

export default vocRouter;
