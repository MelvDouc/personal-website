import { Router } from "express";
import emailController from "../controllers/email.controller.js";
import vocRouter from "./voc.router.js";

const apiRouter = Router();

apiRouter.use("/voc/english", vocRouter);
apiRouter.post("/contact", emailController.contactAdmin);

export default apiRouter;
