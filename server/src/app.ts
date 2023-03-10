import cors from "cors";
import express from "express";
import { join } from "path";
import clientController from "./controllers/client.controller.js";
import apiRouter from "./routes/api.router.js";

const port = process.env.PORT ?? process.env.port ?? process.env.Port ?? 10_002;
const app = express();

app.use(express.static(join("client", "dist")));
app.use(
  cors((req, callback) => {
    const origins = [process.env.CLIENT_ORIGIN0, process.env.CLIENT_ORIGIN1];
    callback(null, {
      origin: process.env.NODE_ENV !== "production" || origins.some((origin) => req.url.startsWith(origin))
    });
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", apiRouter);
app.get("*", clientController.home);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port} ...`);
});