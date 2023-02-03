import cors from "cors";
import express from "express";
import { join } from "path";
import router from "./routes/router.js";

const port = process.env.PORT ?? process.env.port ?? process.env.Port ?? 10_002;
const app = express();

app.use(express.static(join("client", "dist")));
app.use(cors({
  origin: process.env.CLIENT_ORIGIN
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port} ...`);
});