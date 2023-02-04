import cors from "cors";
import express from "express";
import { join } from "path";
import clientController from "./controllers/client.controller.js";
import vocRouter from "./routes/voc.router.js";

const port = process.env.PORT ?? process.env.port ?? process.env.Port ?? 10_002;
const app = express();

app.use(express.static(join("client", "dist")));
app.use(cors({
  origin: process.env.CLIENT_ORIGIN
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/voc", vocRouter);
app.get("/*", clientController.home);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port} ...`);
});