import { static as expressStatic } from "express";
import { readFile } from "fs/promises";
import { join } from "path";
import { Req, Res } from "../types.js";

const clientDir = join(process.cwd(), "client", "dist");

async function home(req: Req, res: Res) {
  try {
    const htmlPath = join(clientDir, "index.html");
    const data = await readFile(htmlPath);
    req.app.use(expressStatic(clientDir));
    res.end(data);
  } catch (error) {
    res.end((<Error>error).message);
  }
}

export default {
  home
};