import { Router } from "express";
import clientController from "../controllers/client.controller.js";

const clientRouter = Router();
clientRouter.get("*", clientController.home);

export default clientRouter;
