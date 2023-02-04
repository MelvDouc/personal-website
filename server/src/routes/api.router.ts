import { Router } from "express";
import sendEmail from "../controllers/email.controller.js";
import vocRouter from "./voc.router.js";

const apiRouter = Router();

apiRouter.use("/voc/english", vocRouter);
apiRouter.post("/contact", sendEmail);

export default apiRouter;
