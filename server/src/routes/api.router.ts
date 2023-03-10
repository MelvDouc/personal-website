import { Router } from "express";
import cvController from "../controllers/cv.controller.js";
import emailController from "../controllers/email.controller.js";
import vocRouter from "./voc.router.js";

const apiRouter = Router();

apiRouter.use("/voc/english", vocRouter);
apiRouter.get("/cv/translations", cvController.getTranslations);
apiRouter.post("/contact", emailController.contactAdmin);

export default apiRouter;
