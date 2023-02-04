import { Router } from "express";
import { englishVocController } from "../controllers/voc.controller.js";

const router = Router();

router.get(
  "/english/one/:id",
  async (req, res) => await englishVocController.getOne(req, res)
);
router.get(
  "/english/all",
  async (req, res) => await englishVocController.getAll(req, res)
);
router.post(
  "/english/create",
  async (req, res) => await englishVocController.create(req, res)
);
router.patch(
  "/english/update/:id",
  async (req, res) => await englishVocController.update(req, res)
);
router.delete(
  "/english/delete/:id",
  async (req, res) => await englishVocController.delete(req, res)
);

export default router;
