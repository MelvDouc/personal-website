import express from "express";
import router from "./routes/router.js";

const port = process.env.PORT ?? process.env.port ?? process.env.Port ?? 10_002;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port} ...`);
});